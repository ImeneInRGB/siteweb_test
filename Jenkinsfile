pipeline {
    agent any
    
    tools {
        
        nodejs 'Node-24.15.0'
        maven 'Maven-3.9.15'
        jdk 'JDK 25.0.3'
    }

    stages {
        stage('Checkout') {
            steps {
                //to take the github code (pulling)
                checkout scm
            }
        }

        stage('PrepareEnv') {
            steps {
                echo "Environment is ready. Node, Java, and Maven are injected."
            }
        }

        stage('BuildTestFront') {
            steps {
                
                dir('frontend') { 
                    sh 'npm install'
                    
                    // On pointe sur le Chromium minimal qu'on vient d'installer sur Ubuntu
                    withEnv(["CHROME_BIN=/usr/bin/chromium-browser"]) {
                        sh 'npm run test'
                    }
                    sh 'npm run build'
                }
            }
        }

        stage('BuildTestBack') {
            steps {
           
                dir('backend') { 
                    sh 'mvn clean test'
                    sh 'mvn package -DskipTests'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                
                archiveArtifacts artifacts: 'frontend/dist/**/*', allowEmptyArchive: false
                archiveArtifacts artifacts: 'backend/target/*.jar', allowEmptyArchive: false
            }
        }
    }
}
