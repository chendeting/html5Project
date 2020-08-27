package com.cj.executor;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.cj.conf.ApplicationContextRegister;
import com.cj.controller.WebSocket;
import com.cj.dao.ReferenceMapper;
import com.cj.service.KaijiangBkService;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class TestJob implements Job {

    private static final Logger log = LoggerFactory.getLogger(TestJob.class);
    private KaijiangBkService kaijiangBkService = ApplicationContextRegister.getApplicationContext().getBean(KaijiangBkService.class);
    private ReferenceMapper referenceMapper = ApplicationContextRegister.getApplicationContext().getBean(ReferenceMapper.class);

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {

        Map<String,Object> mapNow = kaijiangBkService.queryNow(null);
        Map<String, Object> map = kaijiangBkService.queryNow("3");
        long nextkjtime = (new Date(((String) mapNow.get("nextkjtime")).replaceAll("-", "/")).getTime() - System.currentTimeMillis()) / 1000;
        if (map == null && nextkjtime == 0) {
            JSONArray kaijaingRes = new JSONArray();
            JSONObject obj = new JSONObject();
            obj.put("qs",exchangeQs(mapNow));
            obj.put("kjstatue","3");
            obj.put("nextkjdate",mapNow.get("nextkjtime"));
            obj.put("nextkjtime",0);
            obj.put("hm",kaijaingRes);
            WebSocket.GroupSending(JSON.toJSONString(obj,SerializerFeature.WriteMapNullValue));
        }

        if (map != null && map.size() > 0) {
            log.info("-----------结果集-----------" + map.toString());
            kaijiangBkService.updateStatue("100", (Integer) map.get("qs"));
            JSONArray kaijaingRes = new JSONArray();
            JSONObject obj = new JSONObject();
            obj.put("qs",exchangeQs(map));
            obj.put("kjstatue",map.get("kjstatue"));
            obj.put("nextkjdate",map.get("nextkjtime"));
            obj.put("nextkjtime",0);
            ScheduledExecutorService mScheduledExecutorService = Executors.newScheduledThreadPool(1);
            mScheduledExecutorService.scheduleWithFixedDelay(new Runnable() {
                int count = 1;
                @Override
                public void run() {
                    log.info("间隔8s开始发送信息" + map.get("hm" + count));
                    constractHm((String) map.get("hm" + count),kaijaingRes);
                    obj.put("hm",kaijaingRes);
                    WebSocket.GroupSending(JSON.toJSONString(obj,SerializerFeature.WriteMapNullValue));
                    count += 1;
                    if (count == 7) {
                        obj.put("kjstatue","1");
                    }
                    if (count > 7) {
                        log.info("消息发送完毕");
                        kaijiangBkService.updateStatue("1", (Integer) map.get("qs"));
                        mScheduledExecutorService.shutdown();
                    }
                }
            }, 1, 8, TimeUnit.SECONDS);
        }

    }

    private String exchangeQs(Map<String, Object> map) {
        String qs = ((Integer) map.get("qs")).toString();
        qs = qs.length()==1?"00" + qs : "0" + qs;
        return qs;
    }

    private void constractHm(String hm,JSONArray kaijaingRes) {
        hm = hm.length() == 1 ? "0"+ hm : hm;
        Map<String,Object> hmDetails = referenceMapper.selectByHm(hm);
        kaijaingRes.add(hmDetails);
    }
}
