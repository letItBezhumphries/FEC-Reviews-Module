resource "aws_security_group" "reviews_service_securitygroup" {
  vpc_id      = module.main-vpc.vpc_id
  name        = "allow-ssh-${var.prefix}-${terraform.workspace}"
  description = "security group that allows ssh and all egress traffic"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.common_tags
}