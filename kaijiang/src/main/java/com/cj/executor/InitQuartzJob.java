package com.cj.executor;


import com.cj.common.QuartzManager;
import org.yaml.snakeyaml.Yaml;

import java.io.InputStream;
import java.util.Map;

public class InitQuartzJob {

    public static String JOB_GROUP_NAME = "CJ_JOB_GROUP";
    public static String TRIGGER_GROUP_NAME = "CJ_JOB_GROUP";
    private static String test;

    static {
        Yaml yaml = new Yaml();
        InputStream resourceAsStream = TestJob.class.getClassLoader().getResourceAsStream("application.yml");
        Map obj = (Map) yaml.load(resourceAsStream);
        Map quartz = (Map) obj.get("quartz");
        Map cron = (Map) quartz.get("cron");
        test = (String)cron.get("test");
    }

    /**
     * 所有Quartz 调度任务的 启动入口
     */

    public void startQuartzJob() {

        //每天晚上凌晨执行一次
        QuartzManager.addJob("TestJob", JOB_GROUP_NAME, "CycleTaskJob_TRIGGER", TRIGGER_GROUP_NAME, TestJob.class,test);

    }

}
