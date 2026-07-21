pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/yasir-sa/docker-jenkines-learn-in-todo-list.git'
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                    docker rm -f my-todo-app my-postgres-db || true
                    docker compose down || true
                    docker compose up --build -d
                '''
            }
        }
        stage('Create Table') {
            steps {
                sh 'sleep 5 && docker exec my-postgres-db psql -U myuser -d tododb -c "CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, task VARCHAR(255) NOT NULL);"'
            }
        }
    }
}
