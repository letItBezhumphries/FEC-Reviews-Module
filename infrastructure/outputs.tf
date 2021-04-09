output "reviews_bucket_name" {
  value = aws_s3_bucket.reviews_s3_bucket.id
}

output "reviews_cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.reviews_s3_distribution.id
}

output "reviews_service_ip_address" {
  value = aws_instance.reviews-service.public_ip
}

output "vpc_id" {
  value = module.main-vpc.vpc_id
}

output "private_subnets" {
  value = module.main-vpc.private_subnets
}

output "public_subnets" {
  value = module.main-vpc.public_subnets
}

output "reviews_securitygroup_id" {
  value = aws_security_group.reviews_service_securitygroup.id
}
