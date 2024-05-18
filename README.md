This repository contains the code for a guestbook application and instructions for deploying it on a Kubernetes cluster using commands.

**Prerequisites:**

* A running Kubernetes cluster. You can use a cloud provider's managed Kubernetes service (e.g., Google Kubernetes Engine, Amazon EKS, Azure Kubernetes Service) or set up a local cluster using tools like Minikube or Kind.
* `kubectl` command-line tool installed and configured to connect to your Kubernetes cluster.

**Guestbook App Overview:**

This guestbook application is a simple example demonstrating a basic web application deployment on Kubernetes. It allows users to leave messages that are persisted and displayed on the application's frontend.

**Kubernetes Installation:**
These are the steps to install K8s on linux (Debian). Execute the commands in the following sequence:
1. Update the apt package index and install packages needed to use the Kubernetes apt repository:
```bash
sudo apt-get update
# apt-transport-https may be a dummy package; if so, you can skip that package
sudo apt-get install -y apt-transport-https ca-certificates curl
```
2. Download the public signing key for the Kubernetes package repositories. The same signing key is used for all repositories so you can disregard the version in the URL:
```bash
# If the folder `/etc/apt/keyrings` does not exist, it should be created before the curl command, read the note below.
# sudo mkdir -p -m 755 /etc/apt/keyrings
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
sudo chmod 644 /etc/apt/keyrings/kubernetes-apt-keyring.gpg # allow unprivileged APT programs to read this keyring
```
3. Add the appropriate Kubernetes apt repository. If you want to use Kubernetes version different than v1.30, replace v1.30 with the desired minor version in the command below:
```bash
# This overwrites any existing configuration in /etc/apt/sources.list.d/kubernetes.list
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo chmod 644 /etc/apt/sources.list.d/kubernetes.list   # helps tools such as command-not-found to work correctly
```
4. Update apt package index, then install kubectl:

```bash
sudo apt-get update
sudo apt-get install -y kubectl
```
**Now Install Minikube:**
Here the link below, you can install and configure according to the specs of your machine:
[https://minikube.sigs.k8s.io/docs/start/]

**Deployment Steps:**
First of all run this command to initiate the minikube:
```bash
minikube start
```

1. **Build the Guestbook App Image :**
   - If your guestbook app requires building a container image before deployment, follow the specific build instructions provided in the app's codebase. This might involve building a Docker image using a `Dockerfile`.
   ```bash
   docker build -t awaislatif/guestbook-app:01 .

   ```
   OR you can simply pull the image form my DockerHub :
   
   ```bash
   docker push awaislatif/guestbook-app:01
   ```
   
4. **Create Deployment (using kubectl):**
   - Instead of a pre-written YAML file, you can define the deployment configuration directly using the `kubectl create deployment` command. Here's a basic example:

     ```bash
     kubectl create deployment guestbook --image=awaislatif/guestbook-app:01

     ```

5. **Expose the Guestbook App (Optional):**
   - By default, the deployed guestbook application might not be accessible outside the Kubernetes cluster.
   - To make it accessible from your local machine or the internet, consider creating a Kubernetes Service of type `LoadBalancer` (if your cluster supports it) or a NodePort service.

     ```bash
     kubectl expose deployment guestbook --type=LoadBalancer --port=3000
     ```

     - This command creates a LoadBalancer service named `guestbook` that exposes the application on port 3000 (adjust the port if needed).
     - If your cluster doesn't support LoadBalancer, use `--type=NodePort` instead. The service will then be accessible on a specific node port on your cluster's worker nodes.

6. **Verify Deployment:**
   - Use `kubectl get pods` to check if the guestbook application pods are running successfully.
   - Once the pods are running, you should be able to access the application using the method defined in step 3 (e.g., through the service's external IP or the NodePort).
   - Simillarly you can also check the deployments by using `kubectl get deployments`
   - if you get error you can use `kubectl get logs` to check the logs of the running pod.
7. **Start service:**
   first do
   ```bash
   kubectl get services
   ```
   Then execute
   ```bash
   minikube service <service name of the current deployment>
   ```
   This command will provide you a table with info about the deployment.
