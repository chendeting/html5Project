package com.cj;


import com.cj.common.QuartzManager;
import com.cj.executor.InitQuartzJob;
import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.env.Environment;

@SpringBootApplication
@EnableAutoConfiguration
@MapperScan({"com.cj.dao"})
public class KaiJiangApplication {

	private static final Logger log = LoggerFactory.getLogger(KaiJiangApplication.class);
	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(KaiJiangApplication.class);
		Environment env = app.run(args).getEnvironment();
		//Quartz调度初始化
		QuartzManager.instanceScheduler();
		InitQuartzJob quartzJob=new InitQuartzJob();
		quartzJob.startQuartzJob();

		log.info(
				"\n----------------------------------------------------------\n\t"
						+ "Application is running! Access URLs:\n\t" + "Local: \t\thttps://127.0.0.1:{}/{}\n\t"
						+ "\n----------------------------------------------------------",
				env.getProperty("server.port"),"swagger-ui.html");

	}

}
