/**
 * 페이지 이름: 홈
 * 페이지 주소: https://klas.kw.ac.kr/std/cmn/frame/Frame.do
 */

export default () => {
  (async () =>{
   $(".col-md-6.toplogo").append(`
    <button type="button" class="btn2 btn-learn btn-board-check">공지사항 보기</button>
    `);
    $(".col-md-6.toplogo").append(`
     <button type="button" class="btn2 btn-learn btn-board-remove">공지사항 숨기</button>
     `);
     $(".col-md-6.navtxt").append(`
      <div style="color : red">*주의사항* 공지사항 버튼은 한 번만 눌러주세요</div>
      `);

  var subjectsArr1 =[]
  var subjectsArr2 =[]
  var subjectsYear =[]
  var subjectsCode =[]
  var base_url = "https://klas.kw.ac.kr"

  var callAPI = (path, data, callback) => {
      return axios.post(base_url + path, data, { withCredentials: true, headers: { 'Accept': "application/json" } })
          .then(callback).catch((err) => {
              console.log(err)
          })
  }

  var getHome = async (callback) => {
    callAPI("/std/cmn/frame/StdHome.do", {}, callback)
}

var getNotice = async (object, callback) => {
  var data = {
      "selectYearhakgi": object.yearhakgi,
      "selectSubj": object.subj,
      "selectChangeYn": "Y",
      "subjNm": object.subjNm + " (" + object.hakjungno + ") - " + object.profNm,
      "subj": { "value": object.subj, "label": object.subjNm + " (" + object.hakjungno + ") - " + object.profNm }
  }
  callAPI("/std/lis/sport/d052b8f845784c639f036b102fdc3023/BoardStdList.do", data, callback)
}

getHome(async res => {
    var subjects = res.data.atnlcSbjectList;

    var flag =0; //click flag {0:active 1:inactive}
    for (const e of subjects) {
        const obj = {
            yearhakgi: e.yearhakgi,
            subj: e.subj,
            subjNm: e.subjNm,
            hakjungno: e.hakjungno,
            profNm: e.profNm
        }
        await getNotice(obj, async res => {
           var list = res.data.list;
           for(const a of list ){
           /*$('.btn-cooltime').click(() => {
                //alert(JSON.stringify(res.data.list));
                alert('수업:' + obj.subjNm + a.title);
          });*/
          if(a.sortOrdr >= res.data.page.totalElements){
          subjectsArr1.push(`${obj.subjNm}`);
          subjectsArr2.push(`${a.title}`);
          subjectsCode.push(`${obj.subj}`);
          subjectsYear.push(`${obj.yearhakgi}`);
        }
         }
        })
    }


    $('.btn-board-check').click(() => {
         //alert(JSON.stringify(res.data.list));
      if(flag === 0){
        for(var i=0; i<subjectsArr1.length;i++){
           $('.subjectbox').prepend(`<div class="card card-body mb-4" id="bb" style="display : block">
                                       <strong style="color : red; cursor: pointer;"onclick="appModule.goLctrumBoard('/std/lis/sport/d052b8f845784c639f036b102fdc3023/BoardListStdPage.do', '${subjectsYear[i]}', '${subjectsCode[i]}')">${subjectsArr1[i]}</strong>
                                       <div></div>
                                       <div style="cursor: pointer" onclick="appModule.goLctrumBoard('/std/lis/sport/d052b8f845784c639f036b102fdc3023/BoardListStdPage.do', '${subjectsYear[i]}', '${subjectsCode[i]}')">${subjectsArr2[i]}</div>
                                    </div>`);
         };
         $('.btn-board-check').toggleClass('btn-green');
       }
      flag = 1;
     });

     $('.btn-board-remove').click(() => {
          //alert(JSON.stringify(res.data.list));
        if(flag === 1){
        flag = 0;
          for(var i=0; i<subjectsArr1.length;i++){
            $('#bb').remove();
          };
       $('.btn-board-check').toggleClass('btn-green');
     }
      });


})

})();
};
