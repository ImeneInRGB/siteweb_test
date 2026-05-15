pipeline {
    agent any
    
    tools {
        
        nodejs 'nodejs-18'
        maven 'maven-3'
        jdk 'jdk-17'
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
                    sh 'npm run test -- --watch=false --browsers=ChromeHeadless'
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