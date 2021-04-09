provider "aws" {
  region = var.AWS_REGION
}

terraform {
  backend "s3" {
    bucket  = "fec-brokentable-tfstate"
    region  = "us-west-2"
    key     = "modules/reviews.tfstate"
    encrypt = true
  }
}

# locals to attach to resources
# workspace will be either - develop, staging, master
locals {
  prefix = "${var.prefix}-${terraform.workspace}"
  common_tags = {
    Environment = terraform.workspace
    Project     = var.project
    ManagedBy   = "Terraform"
    Owner       = "Eric Humphries"
  }
}


# aws ec2 instance that will serve the photogallery service
resource "aws_instance" "reviews-service" {
  ami                    = var.AMI_ID
  instance_type          = var.INSTANCE_TYPE
  subnet_id              = element(module.main-vpc.public_subnets, 0)
  vpc_security_group_ids = [aws_security_group.reviews_service_securitygroup.id]
  key_name               = aws_key_pair.mykeypair.key_name
  tags                   = local.common_tags
}