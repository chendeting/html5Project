package com.cj.service;



import com.baomidou.mybatisplus.plugins.Page;

import java.util.Map;

public interface HistoryrecordService {

    Page selectPage(int curPage, int limit, Map map);

}
