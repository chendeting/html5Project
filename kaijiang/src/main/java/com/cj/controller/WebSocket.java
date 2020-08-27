package com.cj.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.cj.conf.ApplicationContextRegister;
import com.cj.dao.ReferenceMapper;
import com.cj.service.KaijiangBkService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
@ServerEndpoint("/websocket")
public class WebSocket {

    private static final Logger logger = LoggerFactory.getLogger(WebSocket.class);


    private KaijiangBkService kaijiangBkService = ApplicationContextRegister.getApplicationContext().getBean(KaijiangBkService.class);
    private ReferenceMapper referenceMapper = ApplicationContextRegister.getApplicationContext().getBean(ReferenceMapper.class);

    /**
     *  与某个客户端的连接对话，需要通过它来给客户端发送消息
     */
    private Session session;
    private Integer heartTime = 1;

    /**
     * 标识当前连接客户端的用户名
     */
    private String name;

    /**
     *  用于存所有的连接服务的客户端，这个对象存储是安全的
     */
    private static ConcurrentHashMap<String,WebSocket> webSocketSet = new ConcurrentHashMap<>();

    /**
     * 用于存储所有用户的心跳次数
     */
    private static ConcurrentHashMap<String,Integer> heartTimes = new ConcurrentHashMap<>();

    /**
     * 用于存储所有用户的首次登陆的时间
     */
    private static ConcurrentHashMap<String,Long> loginTime = new ConcurrentHashMap<>();

    //保存最近一次的群发消息
    private static Map<String,String> messageMap = new ConcurrentHashMap<>();


    @OnOpen
    public void OnOpen(Session session) throws IOException {
        this.session = session;
        this.name = UUID.randomUUID().toString();
        // name是用来表示唯一客户端，如果需要指定发送，需要指定发送通过name来区分
        webSocketSet.put(name,this);
        heartTimes.put(name,heartTime);
//        存储用户刚连上的时间
        loginTime.put(name,System.currentTimeMillis());
        Map<String,Object> map = kaijiangBkService.queryNow(null);
        String kjstatue = (String) map.get("kjstatue");
        if ("0".equals(kjstatue) || "1".equals(kjstatue)) {
            logger.info("----------------已开奖或开盘阶段-----------------");
//            直接处理推送,这段代码要是开奖历史有，就直接查开奖历史吧
            JSONArray kaijaingRes = new JSONArray();
            constractHm((String) map.get("hm1"),kaijaingRes);
            constractHm((String) map.get("hm2"),kaijaingRes);
            constractHm((String) map.get("hm3"),kaijaingRes);
            constractHm((String) map.get("hm4"),kaijaingRes);
            constractHm((String) map.get("hm5"),kaijaingRes);
            constractHm((String) map.get("hm6"),kaijaingRes);
            constractHm((String) map.get("hm7"),kaijaingRes);
            JSONObject obj = new JSONObject();
            obj.put("qs",exchangeQs(map));
            obj.put("kjstatue",map.get("kjstatue"));
            obj.put("nextkjtime",(new Date(((String) map.get("nextkjtime")).replaceAll("-","/")).getTime()-System.currentTimeMillis())/1000);
            obj.put("nextkjdate",map.get("nextkjtime"));
            obj.put("hm",kaijaingRes);
            this.session.getBasicRemote().sendText(JSON.toJSONString(obj,SerializerFeature.WriteMapNullValue));
        }else if ("100".equals(kjstatue) || "3".equals(kjstatue)) {
            logger.info("----------------正在开奖阶段-----------------");
//            正在开奖或者在推送号码
            String lastestMsg = messageMap.get("lastestMsg");
            if (lastestMsg == null) {
                logger.info("----------------正在开奖阶段-----------还未开出第一个球-----------------");
                JSONObject obj = new JSONObject();
                obj.put("qs",exchangeQs(map));
                obj.put("kjstatue",map.get("kjstatue"));
                obj.put("nextkjtime",0);
                obj.put("nextkjdate",map.get("nextkjtime"));
                obj.put("hm",new JSONArray());
                this.session.getBasicRemote().sendText(JSON.toJSONString(obj,SerializerFeature.WriteMapNullValue));
            }else {
                logger.info("----------------正在开奖阶段-----------有新球开出-----------------");
                JSONObject object = JSONObject.parseObject(lastestMsg);
                object.put("nextkjtime",0);
                this.session.getBasicRemote().sendText(JSON.toJSONString(object,SerializerFeature.WriteMapNullValue));
            }
        }else {
//            系统故障
            logger.info("系统出问题");
        }
        logger.info("[WebSocket] 连接成功，当前连接人数为：{}",webSocketSet.size());
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


    @OnClose
    public void OnClose(){
        webSocketSet.remove(this.name);
        logger.info("[WebSocket] 退出成功，当前连接人数为：{}",webSocketSet.size());
    }

    @OnMessage
    public void OnMessage(String message){
        logger.info("[WebSocket] 收到消息：{}",message);
        //判断是否需要指定发送，具体规则自定义
        if(message.equalsIgnoreCase("HeartBeat")){
//            记录用户的心跳次数
            Integer heartTime = heartTimes.get(this.name);
            heartTime ++;
            heartTimes.put(this.name,heartTime);
            AppointSending(this.name,"service_response_heart");
        }
    }

    /**
     * 群发
     * @param message
     */
    public static void GroupSending(String message){
        messageMap.put("lastestMsg",message);
        long currentTime = System.currentTimeMillis();
        for (String name : webSocketSet.keySet()){
            try {
                Long fristLoginTime = loginTime.get(name);
                Integer count = heartTimes.get(name) == null ? 0 : heartTimes.get(name);
//                说明超过30s没有心跳了
                if (((currentTime - fristLoginTime) / 1000) - count*5 >60) {
                    webSocketSet.remove(name);
                    logger.info("移除人登录时长：{}s，移除人已接收的心跳次数：{}",(currentTime - fristLoginTime) / 1000,count);
                    logger.info("超过60s没有心跳，移除一人，当前连接人数为：{}",webSocketSet.size());
                }else {
                    webSocketSet.get(name).session.getBasicRemote().sendText(message);
                }
            }catch (Exception e){
                e.printStackTrace();
            }
        }
    }

    @OnError
    public void onError(Session session, Throwable error) {
        logger.error("页面连接建立错误",error.getMessage());
        error.printStackTrace();
    }

    /**
     * 指定发送
     * @param name
     * @param message
     */
    public static void AppointSending(String name,String message){
        try {
            webSocketSet.get(name).session.getBasicRemote().sendText(message);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}

