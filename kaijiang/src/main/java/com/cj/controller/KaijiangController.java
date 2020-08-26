package com.cj.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.cj.model.DCResponse;
import com.cj.service.HistoryrecordService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;


@Controller
@RequestMapping("/running")
public class KaijiangController {

    @Autowired
    private HistoryrecordService historyrecordService;

    /**
     * 选取已有数据列表展示
     *
     */
    @RequestMapping(value = "/historyRecord",method = RequestMethod.POST)
    @ApiOperation(value="开奖历史列表展示",notes="开奖历史列表展示")
    @ResponseBody
    public DCResponse<Page<Map<String,Object>>> list(@ApiParam("每页的偏移量") @RequestParam(value = "limit", required = false, defaultValue = "10") int limit,
                                                     @ApiParam("当前页") @RequestParam(value = "curPage", required = false, defaultValue = "1") int curPage,
                                                     @ApiParam("期号") @RequestParam(value = "qs", required = false) String qs,
                                                     @ApiParam("年份") @RequestParam(value = "years", required = false,defaultValue = "2020") String years) {
        Map map = new HashMap();
        map.put("qs",qs);
        map.put("years",years);
        return DCResponse.ok(historyrecordService.selectPage(curPage, limit,map));
    }


}

