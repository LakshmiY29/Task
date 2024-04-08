import * as cdk from '@aws-cdk/core';
import * as eks from '@aws-cdk/aws-eks';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as rds from '@aws-cdk/aws-rds';

export class MyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC
    const vpc = new ec2.Vpc(this, 'MyVpc', { maxAzs: 3 });

    // Create an EKS Cluster
    const cluster = new eks.Cluster(this, 'MyEKSCluster', { vpc });

    // Create a Kubernetes Deployment
    const deployment = new eks.KubernetesManifest(this, 'MyDeployment', {
      cluster,
      manifest: [{
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        metadata: { name: 'myapp' },
        spec: {
          replicas: 3,
          selector: { matchLabels: { app: 'myapp' } },
          template: {
            metadata: { labels: { app: 'myapp' } },
            spec: {
              containers: [{
                name: 'myapp',
                image: 'amazon/amazon-ecs-sample',
              }],
            },
          },
        },
      }],
    });

    // Create an RDS Database
    new rds.DatabaseInstance(this, 'MyDatabase', {
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_13 }),
      vpc,
    });
  }
}
