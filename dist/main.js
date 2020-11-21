!(function(t){var e={};function n(o){if(e[o])return e[o].exports;var a=(e[o]={i:o,l:!1,exports:{}});return t[o].call(a.exports,a,a.exports,n),(a.l=!0),a.exports}(n.m=t),(n.c=e),(n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})}),(n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}),(n.t=function(t,e){if((1&e&&(t=n(t)),8&e))return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if((n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t))for(var a in t)n.d(o,a,function(e){return t[e]}.bind(null,a));return o}),(n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e}),(n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}),(n.p=""),n((n.s=3))})([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),(e.addListenerByTimer=e.insertLibrary=e.resolveCache=void 0),(e.resolveCache=(t,e)=>t+"?v="+(new Date().getTime()/(1e3*e)).toFixed(0)),(e.insertLibrary=(t)=>{const e=t.split(".");let n;switch(e[e.length-1]){case"js":(n=document.createElement("script")),n.setAttribute("src",t);break;case"css":(n=document.createElement("link")),n.setAttribute("rel","stylesheet"),n.setAttribute("href",t);break;default:throw new Error("The extension of `url` is unexpected value.");}document.head.appendChild(n)}),(e.addListenerByTimer=(t,e)=>{const n=setInterval(()=>{t()&&(clearTimeout(n),e())},100);setTimeout(()=>{clearInterval(n)},1e4)})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),(e.calculateGPA=e.gradeToScore=e.checkExcludeF=e.checkIncludeF=e.checkPass=e.checkMajor=void 0);const o=n(2);(e.checkMajor=(t)=>["전필","전선"].includes(t)),(e.checkPass=(t)=>["A+","A0","B+","B0","C+","C0","D+","D0","P"].includes(t)),(e.checkIncludeF=(t)=>["A+","A0","B+","B0","C+","C0","D+","D0","F","NP"].includes(t)),(e.checkExcludeF=(t)=>["A+","A0","B+","B0","C+","C0","D+","D0"].includes(t)),(e.gradeToScore=(t)=>{switch(t){case"A+":return 4.5;case"A0":return 4;case"B+":return 3.5;case"B0":return 3;case"C+":return 2.5;case"C0":return 2;case"D+":return 1.5;case"D0":return 1;case"F":case"P":case"NP":return 0;default:throw new Error("`grade` is unexpected value.");}}),(e.calculateGPA=(t)=>{const n=[],a=Array(13).fill(0),i=(t,e)=>{const a=e.map((t,e)=>(t?(0===e?t.toString():o.floorFixed(t)):"-"));n.push({name:t,credit:a[0],majorGPA:{includeF:a[1],excludeF:a[3]},nonMajorGPA:{includeF:a[5],excludeF:a[7]},averageGPA:{includeF:a[9],excludeF:a[11]}})};for(const n of t){if(n.semester>2){a[0]+=n.lectures.reduce((t,n)=>t+(e.checkPass(n.grade)?n.credit:0),0);continue}const t=n.lectures.reduce((t,n)=>{const o=n.classification,a=n.credit,i=n.grade,r=e.checkMajor(o),s=e.checkPass(i),l=e.checkIncludeF(i),d=e.checkExcludeF(i);return((t[0]+=s?a:0),(t[1]+=r&&l?e.gradeToScore(i)*a:0),(t[2]+=r&&l?a:0),(t[3]+=r&&d?e.gradeToScore(i)*a:0),(t[4]+=r&&d?a:0),(t[5]+=!r&&l?e.gradeToScore(i)*a:0),(t[6]+=!r&&l?a:0),(t[7]+=!r&&d?e.gradeToScore(i)*a:0),(t[8]+=!r&&d?a:0),(t[9]+=l?e.gradeToScore(i)*a:0),(t[10]+=l?a:0),(t[11]+=d?e.gradeToScore(i)*a:0),(t[12]+=d?a:0),t)},Array(13).fill(0));for(let e=0;e<a.length;e++)a[e]+=t[e];for(let e=1;e<t.length;e+=2)t[e]=t[e+1]>0?t[e]/t[e+1]:0;i(`${n.year}학년도${n.semester}학기`,t)}for(let t=1;t<a.length;t+=2)a[t]=a[t+1]>0?a[t]/a[t+1]:0;return i("전체 학기",a),n})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),(e.floorFixed=void 0),(e.floorFixed=(t,e=2)=>{const n=10**e;return(Math.floor(t*n)/n).toFixed(e)})},function(t,e,n){"use strict";n.r(e);var o=n(0),a=n(1);const i=()=>{const t=[],e=appModule.$data.sungjuk;for(let n=e.length-1;n>=0;n--)t.push({year:parseInt(e[n].thisYear,10),semester:parseInt(e[n].hakgi,10),lectures:e[n].sungjukList.map((t)=>({name:t.gwamokKname,classification:t.codeName1.trim(),credit:parseInt(t.hakjumNum,10),grade:t.getGrade.trim().split(" ")[0]})),});const n=Object(a.calculateGPA)(t);if(($("#hakbu > table:nth-of-type(4)").before('\n    <table id="synthesis-score-table" class="tablegw" style="margin: 25px 0">\n      <colgroup>\n        <col width="25%">\n        <col width="15%">\n        <col width="10%">\n        <col width="10%">\n        <col width="10%">\n        <col width="10%">\n        <col width="10%">\n        <col width="10%">\n      </colgroup>\n      <thead>\n        <tr>\n          <th rowspan="2">학기</th>\n          <th rowspan="2">취득 학점</th>\n          <th colspan="2">전공 평점</th>\n          <th colspan="2">전공 외 평점</th>\n          <th colspan="2">평균 평점</th>\n        </tr>\n        <tr>\n          <th>F 포함</th>\n          <th>미포함</th>\n          <th>F 포함</th>\n          <th>미포함</th>\n          <th>F 포함</th>\n          <th>미포함</th>\n        </tr>\n      </thead>\n      <tbody>\n        '.concat(n.map((t)=>'\n          <tr style="'.concat("전체 학기"===t.name?"font-weight: bold":"",'">\n            <td>').concat(t.name,"</td>\n            <td>").concat(t.credit,"</td>\n            <td>").concat(t.majorGPA.includeF,"</td>\n            <td>").concat(t.majorGPA.excludeF,"</td>\n            <td>").concat(t.nonMajorGPA.excludeF,"</td>\n            <td>").concat(t.nonMajorGPA.excludeF,"</td>\n            <td>").concat(t.averageGPA.excludeF,"</td>\n            <td>").concat(t.averageGPA.excludeF,"</td>\n          </tr>\n        ")).join(""),"\n      </tbody>\n    </table>\n  ")),n.pop(),n.length>=2)){$("#synthesis-score-table").after('\n      <div style="margin-bottom: 25px">\n        <canvas id="synthesis-score-chart"></canvas>\n      </div>\n    ');const t=document.getElementById("synthesis-score-chart");(t.height=80),new Chart(t,{type:"line",data:{labels:n.map((t)=>t.name.split(" ")),datasets:[{label:"전공 평점",data:n.map((t)=>t.majorGPA.includeF),borderColor:"#e74c3c",borderWidth:1,fill:!1,lineTension:0,pointBackgroundColor:"white",pointRadius:5},{label:"전공 외 평점",data:n.map((t)=>t.nonMajorGPA.includeF),borderColor:"#2980b9",borderWidth:1,fill:!1,lineTension:0,pointBackgroundColor:"white",pointRadius:5},{label:"평균 평점",data:n.map((t)=>t.averageGPA.includeF),borderColor:"#bdc3c7",borderWidth:2,fill:!1,lineTension:0,pointBackgroundColor:"white",pointRadius:5},],},options:{scales:{yAxes:[{ticks:{suggestedMin:2,suggestedMax:4.5,stepSite:0.5}}]},tooltips:{callbacks:{title:(t)=>{const e=t[0].xLabel;return e[0]+" "+e[1]},},},},})}};var r={"/std/cmn/frame/Frame.do":()=>{export default()=>{(async()=>{$(".col-md-6.toplogo").append(`<button type="button"class="btn2 btn-learn btn-board-check">공지사항보기</button>`);$(".col-md-6.toplogo").append(`<button type="button"class="btn2 btn-learn btn-board-remove">공지사항숨기</button>`);$(".col-md-6.navtxt").append(`<div style="color : red"><버튼설명>과목별최근공지사항확인</div>`);var subjectsArr1=[]var subjectsArr2=[]var subjectsYear=[]var subjectsCode=[]var base_url="https://klas.kw.ac.kr"var callAPI=(path,data,callback)=>{return axios.post(base_url+path,data,{withCredentials:true,headers:{'Accept':"application/json"}}).then(callback).catch((err)=>{console.log(err)})}var getHome=async(callback)=>{callAPI("/std/cmn/frame/StdHome.do",{},callback)}var getNotice=async(object,callback)=>{var data={"selectYearhakgi":object.yearhakgi,"selectSubj":object.subj,"selectChangeYn":"Y","subjNm":object.subjNm+" ("+object.hakjungno+") - "+object.profNm,"subj":{"value":object.subj,"label":object.subjNm+" ("+object.hakjungno+") - "+object.profNm}}callAPI("/std/lis/sport/d052b8f845784c639f036b102fdc3023/BoardStdList.do",data,callback)}getHome(async res=>{var subjects=res.data.atnlcSbjectList;var flag=0;for(const e of subjects){const obj={yearhakgi:e.yearhakgi,subj:e.subj,subjNm:e.subjNm,hakjungno:e.hakjungno,profNm:e.profNm}await getNotice(obj,async res=>{var list=res.data.list;for(const a of list){if(a.sortOrdr>=res.data.page.totalElements){subjectsArr1.push(`${obj.subjNm}`);subjectsArr2.push(`${a.title}`);subjectsCode.push(`${obj.subj}`);subjectsYear.push(`${obj.yearhakgi}`)}}})}$('.btn-board-check').click(()=>{if(flag===0){for(var i=0;i<subjectsArr1.length;i++){$('.subjectbox').prepend(`<div class="card card-body mb-4"id="bb"style="display : block"><strong style="color : red">${subjectsArr1[i]}</strong><div></div><div style="cursor: pointer"onclick="appModule.goLctrumBoard('/std/lis/sport/d052b8f845784c639f036b102fdc3023/BoardListStdPage.do', '${subjectsYear[i]}', '${subjectsCode[i]}')">${subjectsArr2[i]}</div></div>`)};$('.btn-board-check').toggleClass('btn-green')}flag=1});$('.btn-board-remove').click(()=>{if(flag===1){flag=0;for(var i=0;i<subjectsArr1.length;i++){$('#bb').remove()};$('.btn-board-check').toggleClass('btn-green')}})})})();(async()=>{const settings={nowYear:2020,nowSemester:1,startDate:'2020-06-15',endDate:'2020-06-26',noticeURL:'https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=33096'};if(!settings.startDate||!settings.endDate){return}const startDate=new Date(settings.startDate+' 00:00:00');const endDate=new Date(settings.endDate+' 23:59:59');const nowDate=new Date();if(nowDate<startDate||nowDate>endDate){return}const postDatas={thisYear:settings.nowYear,hakgi:settings.nowSemester,termYn:'Y'};await axios.post('/std/cps/inqire/LctreEvlTermCheck.do').then(response=>{postDatas['judgeChasu']=response.data.judgeChasu});await axios.post('/std/cps/inqire/LctreEvlGetHakjuk.do').then(response=>{postDatas['info']=response.data});let totalCount=0;let remainingCount=0;await axios.post('/std/cps/inqire/LctreEvlsugangList.do',postDatas).then(response=>{totalCount=response.data.length;remainingCount=response.data.filter(v=>v.judgeChasu==='N').length});if(remainingCount===0){return}$('.subjectbox').prepend(`<div class="card card-body mb-4"><div class="bodtitle"><p class="title-text">수업평가안내</p></div><div><div><div><strong>${settings.startDate}</strong>부터<strong>${settings.endDate}</strong>까지기말수업평가를실시합니다.</div><div style="color: red">수업평가를하지않으면성적공개기간에해당과목의성적을확인할수없으니잊지말고반드시평가해주세요.</div><div><strong>${totalCount}개</strong>중<strong>${remainingCount}개</strong>의수업평가가남았습니다.</div></div><div style="margin-top: 20px"><button type="button"class="btn2 btn-learn"onclick="linkUrl('/std/cps/inqire/LctreEvlStdPage.do')">수업평가</button><a href="${settings.noticeURL}"target="_blank"><button type="button"class="btn2 btn-gray">공지사항확인</button></a></div></div></div>`)})();(()=>{$('.subjectbox').prepend(`<div class="card card-body mb-4"><div class="bodtitle"><p class="title-text"style="color:blue">수강과목현황</p></div><table id="yes-deadline"style="width: 100%"><colgroup><col width="16%"><col width="22%"><col width="22%"><col width="22%"></colgroup><thead><tr style="border-bottom: 1px solid #dce3eb; font-weight: bold; height: 40px"><td></td><td>온라인강의</td><td>과제</td><td>팀프로젝트</td><td>퀴즈</td><td></td></tr></thead><tbody></tbody></table><div id="no-deadline"style="display: none; text-align: center"><span style="color: green; font-weight: bold">남아있는항목이없습니다.깔끔하네요!😊</span></div></div>`);const updateDeadline=async(subjects)=>{const promises=[];const deadline={};let isExistDeadline=false;for(const subject of subjects){deadline[subject.subj]={subjectName:subject.subjNm,subjectCode:subject.subj,yearSemester:subject.yearhakgi,lecture:{remainingTime:Infinity,remainingCount:0,totalCount:0},homework:{remainingTime:Infinity,remainingCount:0,totalCount:0},teamProject:{remainingTime:Infinity,remainingCount:0,totalCount:0},quiz:{remainingTime:Infinity,remainingCount:0,totalCount:0}};promises.push(axios.post('/std/lis/evltn/SelectOnlineCntntsStdList.do',{selectSubj:subject.subj,selectYearhakgi:subject.yearhakgi,selectChangeYn:'Y'}));promises.push(axios.post('/std/lis/evltn/TaskStdList.do',{selectSubj:subject.subj,selectYearhakgi:subject.yearhakgi,selectChangeYn:'Y'}));promises.push(axios.post('/std/lis/evltn/PrjctStdList.do',{selectSubj:subject.subj,selectYearhakgi:subject.yearhakgi,selectChangeYn:'Y'}));promises.push(axios.post('/std/lis/evltn/AnytmQuizStdList.do',{selectSubj:subject.subj,selectYearhakgi:subject.yearhakgi,selectChangeYn:'Y'}))}const parseLecture=(subjectCode,responseData)=>{const nowDate=new Date();for(const lecture of responseData){if(lecture.evltnSe!=='lesson'||lecture.prog===100){continue}const endDate=new Date(lecture.endDate+':59');const hourGap=Math.floor((endDate-nowDate)/3600000);if(hourGap<0){continue}if(deadline[subjectCode].lecture.remainingTime>hourGap){deadline[subjectCode].lecture.remainingTime=hourGap;deadline[subjectCode].lecture.remainingCount=1}else if(deadline[subjectCode].lecture.remainingTime===hourGap){deadline[subjectCode].lecture.remainingCount++}deadline[subjectCode].lecture.totalCount++;isExistDeadline=true}};const parseHomework=(subjectCode,responseData,homeworkType='HW')=>{const nowDate=new Date();for(const homework of responseData){if(homework.submityn==='Y'){continue}let endDate=new Date(homework.expiredate);let hourGap=Math.floor((endDate-nowDate)/3600000);if(hourGap<0){if(!homework.reexpiredate){continue}endDate=new Date(homework.reexpiredate);hourGap=Math.floor((endDate-nowDate)/3600000);if(hourGap<0){continue}}if(homeworkType==='HW'){if(deadline[subjectCode].homework.remainingTime>hourGap){deadline[subjectCode].homework.remainingTime=hourGap;deadline[subjectCode].homework.remainingCount=1}else if(deadline[subjectCode].homework.remainingTime===hourGap){deadline[subjectCode].homework.remainingCount++}deadline[subjectCode].homework.totalCount++}else if(homeworkType==='TP'){if(deadline[subjectCode].teamProject.remainingTime>hourGap){deadline[subjectCode].teamProject.remainingTime=hourGap;deadline[subjectCode].teamProject.remainingCount=1}else if(deadline[subjectCode].teamProject.remainingTime===hourGap){deadline[subjectCode].teamProject.remainingCount++}deadline[subjectCode].teamProject.totalCount++}isExistDeadline=true}};const parseQuiz=(subjectCode,responseData)=>{const nowDate=new Date();for(const quiz of responseData){if(quiz.issubmit==='Y'){continue}const endDate=new Date(quiz.edt+':59');const hourGap=Math.floor((endDate-nowDate)/3600000);if(hourGap<0){continue}if(deadline[subjectCode].quiz.remainingTime>hourGap){deadline[subjectCode].quiz.remainingTime=hourGap;deadline[subjectCode].quiz.remainingCount=1}else if(deadline[subjectCode].quiz.remainingTime===hourGap){deadline[subjectCode].quiz.remainingCount++}deadline[subjectCode].quiz.totalCount++;isExistDeadline=true}};await axios.all(promises).then(results=>{for(const response of results){const subjectCode=JSON.parse(response.config.data).selectSubj;switch(response.config.url){case'/std/lis/evltn/SelectOnlineCntntsStdList.do':parseLecture(subjectCode,response.data);break;case'/std/lis/evltn/TaskStdList.do':parseHomework(subjectCode,response.data,'HW');break;case'/std/lis/evltn/PrjctStdList.do':parseHomework(subjectCode,response.data,'TP');break;case'/std/lis/evltn/AnytmQuizStdList.do':parseQuiz(subjectCode,response.data);break}}});const sortedDeadline=Object.values(deadline).sort((left,right)=>{const minLeft=left.lecture.remainingTime<left.lecture.remainingTime?left.lecture:left.homework;const minRight=right.lecture.remainingTime<right.lecture.remainingTime?right.lecture:right.homework;if(minLeft.remainingTime!==minRight.remainingTime){return minLeft.remainingTime-minRight.remainingTime}if(minLeft.remainingCount!==minRight.remainingCount){return minRight.remainingCount-minLeft.remainingCount}return(right.lecture.remainingCount+right.homework.remainingCount)-(left.lecture.remainingCount+left.homework.remainingCount)});const createContent=(name,info)=>{if(info.remainingTime===Infinity){return`<span style="color: green">남아있는${name}가없습니다!</span>`}const remainingDay=Math.floor(info.remainingTime/24);const remainingHour=info.remainingTime%24;if(remainingDay===0){if(remainingHour===0){return`<span style="color: red; font-weight: bold">${info.totalCount}개의${name}중${info.remainingCount}개가곧마감입니다.😱</span>`}else{return`<span style="color: red; font-weight: bolder">${info.totalCount}개의${name}중<strong>${info.remainingCount}개</strong>가<strong>${remainingHour}시간후</strong>마감입니다.😭</span>`}}else if(remainingDay===1){return`<span style="color: red">${info.totalCount}개의${name}중<strong>${info.remainingCount}개</strong>가<strong>1일후</strong>마감입니다.😥</span>`}else{return`<span>${info.totalCount}개의${name}중<strong>${info.remainingCount}개</strong>가<strong>${remainingDay}일후</strong>마감입니다.</span>`}};const trCode=sortedDeadline.reduce((acc,cur)=>{acc+=`<tr style="border-bottom: 1px solid #dce3eb; height: 30px"><td style="font-weight: bold"><span style="cursor: pointer"onclick="appModule.goLctrum('${cur.yearSemester}', '${cur.subjectCode}')">${cur.subjectName}</span></td><td><span style="cursor: pointer"onclick="appModule.goLctrumBoard('/std/lis/evltn/OnlineCntntsStdPage.do', '${cur.yearSemester}', '${cur.subjectCode}')">${createContent('강의',cur.lecture)}</span></td><td><span style="cursor: pointer"onclick="appModule.goLctrumBoard('/std/lis/evltn/TaskStdPage.do', '${cur.yearSemester}', '${cur.subjectCode}')">${createContent('과제',cur.homework)}<span></td><td><span style="cursor: pointer"onclick="appModule.goLctrumBoard('/std/lis/evltn/PrjctStdPage.do', '${cur.yearSemester}', '${cur.subjectCode}')">${createContent('팀 프로젝트',cur.teamProject)}<span></td><td><span style="cursor: pointer"onclick="appModule.goLctrumBoard('/std/lis/evltn/AnytmQuizStdPage.do', '${cur.yearSemester}', '${cur.subjectCode}')">${createContent('퀴즈',cur.quiz)}<span></td></tr>`;return acc},'');if(isExistDeadline){$('#yes-deadline > tbody').html(trCode);$('#yes-deadline').css('display','table');$('#no-deadline').css('display','none')}else{$('#yes-deadline').css('display','none');$('#no-deadline').css('display','block')}};appModule.$watch('atnlcSbjectList',watchValue=>{updateDeadline(watchValue)});const waitTimer=setInterval(()=>{if(appModule&&appModule.atnlcSbjectList.length>0){clearInterval(waitTimer);updateDeadline(appModule.atnlcSbjectList)}},100)})()}},"/std/cps/atnlc/LectrePlanStdPage.do":()=>{let t=!1;(appModule.getSearch=function(){(this.selectYearHakgi=this.selectYear+","+this.selecthakgi),"all"!==this.selectRadio||""!==this.selectText||""!==this.selectProfsr||""!==this.cmmnGamok||""!==this.selecthakgwa?t?alert("서버 부하 문제를 방지하기 위해 5초 뒤에 검색이 가능합니다."):((t=!0),setTimeout(()=>{t=!1},5e3),axios.post("LectrePlanStdList.do",this.$data).then((t)=>{this.list=t.data})):alert("과목명 또는 담당 교수를 입력하지 않은 경우 반드시 과목이나 학과를 선택하셔야 합니다.")}),$('table:nth-of-type(1) input[type="text"]').keydown((t)=>{13===t.keyCode&&appModule.getSearch()}),$("table:nth-of-type(1) tr:nth-of-type(5) > td").text("인증 코드를 입력하실 필요가 없습니다.")},"/std/cps/atnlc/LectrePlanGdhlStdPage.do":()=>{let t=!1;(appModule.getSearch=function(){this.selectGdhlitem?t?alert("서버 부하 문제를 방지하기 위해 5초 뒤에 검색이 가능합니다."):((t=!0),setTimeout(()=>{t=!1},5e3),axios.post("LectrePlanDaList.do",this.$data).then((t)=>{this.GdhlList=t.data})):alert("대학원을 선택해 주세요.")}),$('table:nth-of-type(1) input[type="text"]').keydown((t)=>{13===t.keyCode&&appModule.getSearch()}),$("table:nth-of-type(1) tr:nth-of-type(4) > td").text("인증 코드를 입력하실 필요가 없습니다.")},"/std/cps/inqire/AtnlcScreStdPage.do":()=>{Object(o.addListenerByTimer)(()=>{var t;return(null===(t=appModule)||void 0===t?void 0:t.$data.sungjuk.length)>0},i)},"/std/cps/inqire/StandStdPage.do":()=>{$(".tablegw").after('\n    <div style="margin-top: 10px">\n      <button type="button" id="rank-button" class="btn2 btn-learn">이전 석차 내역 불러오기</button>\n    </div>\n  '),$("#rank-button").click(async()=>{const t=[];let e=appModule.$data.selectYear,n=appModule.$data.selectHakgi;const o=parseInt(appModule.$data.info[0].hakbun.substring(0,4));for($("#rank-button").hide();"2"===n?(n="1"):(e--,(n="2")),!(e<o);){const o={selectYearhakgi:e+","+n,selectChangeYn:"Y"};t.push(axios.post("/std/cps/inqire/StandStdList.do",o))}await axios.all(t).then((t)=>{for(const e of t)e.data&&$("table.AType > tbody").append("\n            <tr>\n              <td>".concat(e.data.thisYear,"</td>\n              <td>").concat(e.data.hakgi,"</td>\n              <td>").concat(e.data.applyHakjum,"</td>\n              <td>").concat(e.data.applySum,"</td>\n              <td>").concat(e.data.applyPoint,"</td>\n              <td>").concat(e.data.pcnt,"</td>\n              <td>").concat(e.data.classOrder," / ").concat(e.data.manNum,"</td>\n              <td>").concat(e.data.warningOpt||"","</td>\n            </tr>\n          "))})})},"/std/lis/evltn/LctrumHomeStdPage.do":()=>{(lrnCerti.certiCheck=function(t,e,n,o,a,i,r,s,l,d,c,p,u,g,h,b,m,f,y,v,k){console.log(t,e,n,o,a,i,r,s,l,d,c,p,u,g,h,b,m,f,y,v,k),(this.grcode=t),(this.subj=e),(this.weeklyseq=c),(this.gubun=k),axios.post("/std/lis/evltn/CertiStdCheck.do",this.$data).then(function(){appModule.goViewCntnts(t,e,n,o,a,i,r,s,l,d,c,p,u,g,h,b,m,f,y,v)}.bind(this))}),$("p:contains('온라인 강의리스트')").append('\n    <button type="button" class="btn2 btn-learn btn-cooltime">2분 쿨타임 제거</button>\n    <button type="button" class="btn2 btn-gray btn-clean">강의 숨기기 On / Off</button>\n  '),$(".btn-cooltime").click(()=>{(appModule.getLrnSttus=function(){axios.post("/std/lis/evltn/SelectLrnSttusStd.do",this.$data).then(function(t){if(((this.lrnSttus=t.data),"Y"===t.data||"N"===t.data))if(ios)$("#viewForm").prop("target","_blank").prop("action","/spv/lis/lctre/viewer/LctreCntntsViewSpvPage.do").submit();else{let t=window.open("","previewPopup","resizable=yes, scrollbars=yes, top=100px, left=100px, height="+this.height+"px, width= "+this.width+"px");$("#viewForm").prop("target","previewPopup").prop("action","/spv/lis/lctre/viewer/LctreCntntsViewSpvPage.do").submit().prop("target",""),t.focus()}else t.request.responseURL.includes("LoginForm.do")&&linkUrl(t.request.responseURL)}.bind(this))}),alert("2분 쿨타임이 제거되었습니다.")}),$(".btn-clean").click(()=>{if(null==appModule.origin){appModule.origin=appModule.cntntList;let t=[];appModule.cntntList.forEach((e)=>{"100"!=e.prog&&t.push(e)}),(appModule.cntntList=t)}else(appModule.cntntList=appModule.origin),(appModule.origin=void 0);$(".btn-clean").toggleClass("btn-green"),$(".btn-clean").toggleClass("btn-gray")}),$("select[name='selectSubj']").change(()=>{(appModule.origin=void 0),$(".btn-green").toggleClass("btn-green").toggleClass("btn-gray")})},"/std/cps/inqire/LctreEvlViewStdPage.do":()=>{$(".tablegw").before('\n    <div style="border: 1px solid #ddd; margin: 20px 0 35px 0">\n      <div style="background-color: #d3e9f8; border-bottom: 1px solid #ddd; font-weight: bold; padding: 5px; text-align: center">일괄 선택 기능</div>\n      <div style="overflow: hidden; padding: 10px 0; text-align: center">\n        <div style="float: left; width: 25%">\n          <input type="radio" name="auto" id="auto-2">\n          <label for="auto-2" style="margin: 0">그렇지 않다</label>\n        </div>\n        <div style="float: left; width: 25%">\n          <input type="radio" name="auto" id="auto-3">\n          <label for="auto-3" style="margin: 0">보통이다</label>\n        </div>\n        <div style="float: left; width: 25%">\n          <input type="radio" name="auto" id="auto-4">\n          <label for="auto-4" style="margin: 0">그렇다</label>\n        </div>\n        <div style="float: left; width: 25%">\n          <input type="radio" name="auto" id="auto-5">\n          <label for="auto-5" style="margin: 0">정말 그렇다</label>\n        </div>\n      </div>\n    </div>\n  '),$('input[name="auto"]').change(function(){let t=parseInt(this.id.split("-")[1]);$('.tablegw input[value="'.concat(t,'"]')).each(function(){(appModule[this.name]=t),appModule.checkValue(this.name)})})},"/std/lis/evltn/OnlineCntntsStdPage.do":()=>{(appModule.setRowspan=function(){for(let t=1;t<=16;t++){const e=$(".weekNo-"+t),n=$(".moduletitle-"+t),o=$(".totalTime-"+t);e.removeAttr("rowspan").show(),n.removeAttr("rowspan").show(),o.removeAttr("rowspan").show(),e.length>1&&(e.eq(0).attr("rowspan",e.length),e.not(":eq(0)").hide()),n.length>1&&(n.eq(0).attr("rowspan",n.length),n.not(":eq(0)").hide()),o.length>1&&(o.eq(0).attr("rowspan",o.length),o.not(":eq(0)").hide())}}),$("#appModule > table:not(#prjctList)").after('\n    <div id="new-features" style="border: 1px solid #d3d0d0; border-radius: 5px; margin-top: 30px; padding: 10px">\n      <div>온라인 강의 다운로드는 \'보기\' 버튼을 누르면 나오는 강의 화면 페이지에서 이용하실 수 있습니다.</div>\n      <div style="color: red">온라인 강의 시 사용되는 강의 내용을 공유 및 배포하는 것은 저작권을 침해하는 행위이므로 꼭 개인 소장 용도로만 이용해 주시기 바랍니다.</div>\n      <div style="font-weight: bold; margin-top: 10px">추가된 기능</div>\n      <div>- 2분 쿨타임 제거: 2분 쿨타임을 제거할 수 있습니다. 단, 동시에 여러 콘텐츠 학습을 하지 않도록 주의해 주세요.</div>\n      <div>- 강의 숨기기: 진도율 100%인 강의를 숨길 수 있습니다.</div>\n      <div style="margin-top: 20px">\n        <button type="button" id="btn-cooltime" class="btn2 btn-learn">2분 쿨타임 제거</button>\n        <button type="button" id="btn-hide-lecture" class="btn2 btn-gray">강의 숨기기 On / Off</button>\n      </div>\n    </div>\n'),$("#btn-cooltime").click(()=>{(appModule.getLrnSttus=function(){axios.post("/std/lis/evltn/SelectLrnSttusStd.do",this.$data).then(function(t){if(((this.lrnSttus=t.data),"Y"===t.data||"N"===t.data))if(ios)$("#viewForm").prop("target","_blank").prop("action","/spv/lis/lctre/viewer/LctreCntntsViewSpvPage.do").submit();else{let t=window.open("","previewPopup","resizable=yes, scrollbars=yes, top=100px, left=100px, height="+this.height+"px, width= "+this.width+"px");$("#viewForm").prop("target","previewPopup").prop("action","/spv/lis/lctre/viewer/LctreCntntsViewSpvPage.do").submit().prop("target",""),t.focus()}else t.request.responseURL.includes("LoginForm.do")&&linkUrl(t.request.responseURL)}.bind(this))}),alert("2분 쿨타임이 제거되었습니다.")}),$("#btn-hide-lecture").click(()=>{appModule.listBackup?((appModule.list=appModule.listBackup),(appModule.listBackup=void 0)):((appModule.listBackup=appModule.list),(appModule.list=appModule.list.filter((t)=>{if(100!==t.prog)return t}))),$("#btn-hide-lecture").toggleClass("btn-gray"),$("#btn-hide-lecture").toggleClass("btn-green")}),$('select[name="selectSubj"]').change(()=>{(appModule.listBackup=void 0),$("#new-features .btn-green").toggleClass("btn-green").toggleClass("btn-gray")}),(lrnCerti.certiCheck=function(t,e,n,o,a,i,r,s,l,d,c,p,u,g,h,b,m,f,y,v,k){console.log(t,e,n,o,a,i,r,s,l,d,c,p,u,g,h,b,m,f,y,v,k),(this.grcode=t),(this.subj=e),(this.weeklyseq=c),(this.gubun=k),axios.post("/std/lis/evltn/CertiStdCheck.do",this.$data).then(function(){appModule.goViewCntnts(t,e,n,o,a,i,r,s,l,d,c,p,u,g,h,b,m,f,y,v)}.bind(this))})},"/spv/lis/lctre/viewer/LctreCntntsViewSpvPage.do":()=>{$("body").append('\n      <div id="modal-keyboard-shortcut" class="modal" style="font-size: 14px">\n        <p><kbd>Enter</kbd> <kbd>F</kbd> : <strong>전체 화면 설정 / 해제</strong></p>\n        <p><kbd>←</kbd> <kbd>→</kbd> : <strong>10초씩 이동</strong></p>\n        <p><kbd>↑</kbd> <kbd>↓</kbd> : <strong>10%씩 볼륨 조절</strong></p>\n        <p><kbd>M</kbd> : <strong>음소거 설정 / 해제</strong></p>\n        <p><kbd>Backspace</kbd> <kbd>P</kbd> : <strong>페이지 단위로 이동 (이전 페이지)</strong></p>\n        <p><kbd>N</kbd> : <strong>페이지 단위로 이동 (다음 페이지)</strong></p>\n        <p><kbd>X</kbd> <kbd>C</kbd> : <strong>0.2 단위로 배속 조절</strong></p>\n        <p><kbd>Z</kbd> : <strong>1.0 배속으로 초기화</strong></p>\n      </div>\n    '),$("#modal-keyboard-shortcut kbd").css({backgroundColor:"#eee",border:"1px solid #b4b4b4",borderRadius:"3px",boxShadow:"0 1px 1px rgba(0, 0, 0, 0.2), 0 2px 0 0 rgba(255, 255, 255, 0.7) inset",color:"#333",fontFamily:"Consolas, monospace",fontSize:"11px",fontWeight:"bold",padding:"2px 4px",position:"relative",top:"-1px",}),$("#modal-keyboard-shortcut strong").css({position:"relative",top:"1px"}),$(".mvtopba > label:last-of-type").after('\n      <label>\n        <a href="#modal-keyboard-shortcut" rel="modal:open" style="background-color: #8e44ad; padding: 10px; text-decoration: none">\n          <span style="color: white; font-weight: bold; margin-left: 4px">단축키 안내</span>\n        </a>\n      </label>\n    ');const t=chkOpen.toString().split("https://kwcommons.kw.ac.kr/em/")[1].split('"')[0];document.body.setAttribute("data-video-code",t)},};window.addEventListener("load",()=>{const t=["https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js","https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css","https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js",];for(const e of t)Object(o.insertLibrary)(e);Object.prototype.hasOwnProperty.call(r,location.pathname)&&r[location.pathname](),$(".navtxt").prepend('\n    <span style="margin-right: 20px">\n      <a href="https://github.com/nbsp1221/klas-helper" target="_blank" rel="noopener">KLAS Helper</a> 사용 중\n    </span>\n  '),$(".btnup").css({bottom:"30px",position:"fixed",right:"30px"}),setInterval(()=>{fetch("/")},6e5)})},]);