package com.centricminds.distance;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SortController {
	
	private static Logger logger = LoggerFactory.getLogger(SortController.class);
	
	@PostMapping("sortlist")
	@ResponseBody
	public List<String> sort(@RequestParam("unsortedlist") List<String> unsortedlist){

		Collections.sort(unsortedlist, new Comparator<String>() {
		    @Override
		    public int compare(String o1, String o2) {
		    	String[] dnu1 = o1.split("-");
		    	String[] dnu2 = o2.split("-");
		    	double number1 = stringToDouble(dnu1[0]);
		    	double number2 = stringToDouble(dnu2[0]);
		    	double compareNo1 = calculateInUnits(number1,dnu1[1]);
		    	double compareNo2 = calculateInUnits(number2,dnu2[1]);
		    	if(compareNo1-compareNo2<0) {
		    		return -1;
		    	}else if(compareNo1-compareNo2>0) {
		    		return 1;
		    	}else {
		    		logger.info("there are same values of distances:"+dnu1[0]+dnu1[1]+" and "+dnu2[0]+dnu2[1]);
		    		return 0;
		    	}
		    }
		});
		
		List<String> newSortList = new ArrayList<>();
		for (String distance : unsortedlist) {
			String[] split = distance.split("-");
			newSortList.add(split[0]+split[1]);
		}
		return newSortList;
	}
	
	private double stringToDouble(String a){
    	double b = Double.valueOf(a);
    	DecimalFormat df = new DecimalFormat("#.0000000000");
    	String temp = df.format(b);
    	b = Double.valueOf(temp);
    	return b;
    }
	
	private double calculateInUnits(double number, String unit) {
		if("KM".equals(unit)) {
			return number*1000;
		}else if("M".equals(unit)) {
			return number;
		}else if("CM".equals(unit)) {
			return number/100;
		}else{
			return number/1000;
		}
	}
}
