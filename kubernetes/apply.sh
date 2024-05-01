kubectl apply -f consumer-deployment.yaml;
kubectl apply -f flaskapp-deployment.yaml;
kubectl apply -f kafka-deployment.yaml;
kubectl apply -f nextjs-deployment.yaml;
kubectl apply -f nginx-deployment.yaml;
kubectl apply -f producer-deployment.yaml;

# kubectl apply -f load-generator.yaml;