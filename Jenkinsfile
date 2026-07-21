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
                sh '''
                    echo "Waiting for PostgreSQL to be ready..."
                    for i in $(seq 1 15); do
                        docker exec my-postgres-db pg_isready -U myuser && break
                        echo "Attempt $i: Not ready yet, waiting..."
                        sleep 3
                    done
                    docker exec my-postgres-db psql -U myuser -d tododb -c "CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, task VARCHAR(255) NOT NULL);"
                '''
            }
        }
    }
}
