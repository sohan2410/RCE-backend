FROM public.ecr.aws/lambda/nodejs:16 as builder
WORKDIR /usr/app
COPY package.json index.ts  ./
RUN npm install
RUN npm run build
    

FROM public.ecr.aws/lambda/nodejs:16
RUN yum -y groupinstall "Development Tools"
RUN yum install -y python37
RUN yum install -y java-1.8.0-openjdk
WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder /usr/app/dist/* ./
CMD ["index.handler"]