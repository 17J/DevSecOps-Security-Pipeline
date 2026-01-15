pipeline {
    agent any
    tools {
        nodejs "nodejs-23.8"
    }
    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        FRONTEND_IMAGE_NAME = 'perfume-ecom-mern-frontend'
        BACKEND_IMAGE_NAME = 'perfume-ecom-mern-backend'
        IMAGE_TAG = "${BUILD_NUMBER}"
        DOCKER_REGISTRY = ""
        DOCKER_USERS = "17rj"
        K8S_NAMESPACE = 'demoapps'
    }
    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
        stage('Checkout Code') {
            steps {
                git branch: 'main', changelog: false, poll: false, url: 'https://github.com/17J/DevSecOps-Security-Pipeline.git'
            }
        }
        stage('Gitleaks Secret Scanning') {
            steps {
                // Replace --exit-code 0 to 1 into RealTime Pipeline
                sh '''
                    gitleaks detect --no-git --verbose --redact \
                    --exit-code 0 --report-format json --report-path gitleaks-report.json 
                '''
            }
        }
        stage('Install Dependencies & Lint') {
            parallel {
                stage('Frontend') {
                    steps {
                        dir('frontend') {
                            sh '''
                                npm ci
                                npm run lint || true         
                                npm run build                 
                            '''
                        }
                    }
                }
                stage('Backend') {
                    steps {
                        dir('backend') {
                            sh 'find . -name "*.js" -exec node --check {} +'
                        }
                    }
                }
            }
        }
        stage('Snyk SCA Scan') {
            parallel {
                stage('Frontend') {
                    steps {
                        dir('frontend') {
                            withCredentials([string(credentialsId: 'SNYK_Cred', variable: 'SNYK_TOKEN')]) {
                                sh '''
                                    snyk auth $SNYK_TOKEN
                                    snyk test --severity-threshold=high \
                                    --json-file-output=snyk-frontend.json || true
                                '''
                            }
                        }
                    }
                }
                stage('Backend') {
                    steps {
                        dir('backend') {
                            withCredentials([string(credentialsId: 'SNYK_Cred', variable: 'SNYK_TOKEN')]) {
                                sh '''
                                    snyk auth $SNYK_TOKEN
                                    snyk test --severity-threshold=high \
                                    --json-file-output=snyk-backend.json || true
                                '''
                            }
                        }
                    }
                }
            }
        }
        stage('Sonarqube Code Analysis') {
            steps {
                withSonarQubeEnv('sonar') {
                    sh '''
                        $SCANNER_HOME/bin/sonar-scanner \
                        -Dsonar.projectKey=devsecops-pipeline \
                        -Dsonar.sources=frontend/src,backend/ \
                        -Dsonar.exclusions=**/node_modules/**,**/coverage/**,**/dist/** \
                        -Dsonar.javascript.lcov.reportPaths=frontend/coverage/lcov.info,backend/coverage/lcov.info
                    '''
                }
            }
        }
        stage('Quality Gate') {
            steps {
                timeout(time: 20, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('Trivy Filesystem Scan') {
            parallel {
                // Replace --exit-code 0 to 1 into RealTime Pipeline
                stage('Frontend FS') {
                    steps {
                        sh 'trivy fs --severity HIGH,CRITICAL --exit-code 0 --format table -o trivy-fs-frontend.html frontend/'
                    }
                }
                stage('Backend FS') {
                    steps {
                        sh 'trivy fs --severity HIGH,CRITICAL --exit-code 0 --format table -o trivy-fs-backend.html backend/'
                    }
                }
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    // Build frontend
                    sh """
                        docker build -t ${FRONTEND_IMAGE_NAME}:${IMAGE_TAG} \
                            --file frontend/Dockerfile ./frontend
                    """
                    sh """
                        docker tag ${FRONTEND_IMAGE_NAME}:${IMAGE_TAG} \
                            ${DOCKER_USERS}/${FRONTEND_IMAGE_NAME}:latest
                    """
                    // Build backend 
                    sh """
                        docker build -t ${BACKEND_IMAGE_NAME}:${IMAGE_TAG} \
                            --file backend/Dockerfile ./backend
                    """
                    sh """
                        docker tag ${BACKEND_IMAGE_NAME}:${IMAGE_TAG} \
                            ${DOCKER_USERS}/${BACKEND_IMAGE_NAME}:latest
                    """
                }
            }
        }
        stage('Dockle Image Scan') {
            // Replace --exit-code 0 to 1 into RealTime Pipeline
            steps {
                script {
                    // Scan frontend
                    sh """
                    dockle --exit-code 0 --exit-level warn \
                        ${DOCKER_USERS}/${FRONTEND_IMAGE_NAME}:latest || true
                    """
                    // Scan backend
                    sh """
                    dockle --exit-code 0 --exit-level warn \
                        ${DOCKER_USERS}/${BACKEND_IMAGE_NAME}:latest || true
                    """
                }
            }
        }
        stage('Generate SBOM') {
            parallel {
                stage('Frontend SBOM') {
                    steps {
                        sh """
                    # Using Syft
                    syft ${DOCKER_USERS}/${FRONTEND_IMAGE_NAME}:latest \
                        -o cyclonedx-json > sbom-frontend.json
                """
                        archiveArtifacts artifacts: 'sbom-frontend*.json'
                    }
                }
                stage('Backend SBOM') {
                    steps {
                        sh """
                    syft ${DOCKER_USERS}/${BACKEND_IMAGE_NAME}:latest \
                        -o cyclonedx-json > sbom-backend.json
                """
                        archiveArtifacts artifacts: 'sbom-backend*.json'
                    }
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-creds', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                        // Push Frontend
                        sh "docker push ${DOCKER_USERS}/${FRONTEND_IMAGE_NAME}:latest"
                        // Push Backend
                        sh "docker push ${DOCKER_USERS}/${BACKEND_IMAGE_NAME}:latest"
                    }
                }
            }
        }
        stage('Kubernetes Deploy') {
            steps {
                dir('/var/lib/jenkins/workspace/PureNW-DevSecOps-Pipeline/K8s/') {
                    withKubeConfig(caCertificate: '', clusterName: ' expdevops-cluster', contextName: '', credentialsId: 'k8s-cred', namespace: 'demoapps', restrictKubeConfigAccess: false, serverUrl: 'https://CA471378C7B76B74B8BFD8C3CE223509.gr7.ap-south-1.eks.amazonaws.com') {
                        sh '''
                            set -e
                            kubectl apply -f backend-deployment-service.yml -n ${K8S_NAMESPACE}
                            kubectl apply -f db-ds.yml -n ${K8S_NAMESPACE}
                            kubectl apply -f frontend-deployment-service.yml -n ${K8S_NAMESPACE}

                            
                            # Wait for deployments to be ready
                            kubectl wait --for=condition=available --timeout=180s deployment/backend-deployment -n ${K8S_NAMESPACE}
                            kubectl wait --for=condition=available --timeout=180 deployment/db-deployment -n ${K8S_NAMESPACE} || true  # if db is StatefulSet, adjust
                            kubectl wait --for=condition=available --timeout=180s deployment/frontend-deployment -n ${K8S_NAMESPACE}
                        '''
                    }
                }
            }
        }
        stage('Kubernetes Verify') {
            steps {
                withKubeConfig(caCertificate: '', clusterName: ' expdevops-cluster', contextName: '', credentialsId: 'k8s-cred', namespace: 'demoapps', restrictKubeConfigAccess: false, serverUrl: 'https://CA471378C7B76B74B8BFD8C3CE223509.gr7.ap-south-1.eks.amazonaws.com') {
                    sh '''
                        kubectl get pods -n ${K8S_NAMESPACE}
                        kubectl get svc -n ${K8S_NAMESPACE}
                       '''
                }
            }
        }
    }
    post {
        always {
            echo "Pipeline execution completed"
            sh """
                docker rmi ${DOCKER_USERS}/${FRONTEND_IMAGE_NAME}:${IMAGE_TAG} || true
                docker rmi ${DOCKER_USERS}/${BACKEND_IMAGE_NAME}:${IMAGE_TAG} || true
            """
        }
        success {
            echo "✅ DevSecOps Pipeline: SUCCESS"
            // Add Slack/Email notification here if needed
        }
        failure {
            echo "❌ DevSecOps Pipeline: FAILED"
            // Add Slack/Email notification here if needed
        }
    }
}
