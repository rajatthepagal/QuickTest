$("document").ready(function(){
    $('#new-test-form').submit(function( e ){
        makeFormSubmission();
        return false;
    });
   // $("#submit-new-test").click();

});

var deplist= {
    "1":"Computer Science & Engineering",
    "6":"Chemical",
    "5":"Civil",
    "4":"Electrical",
    "2":"Electronics & Telecommunications",
    "7":"Industry & Production",
    "3":"Mechanical"
};

function makeFormSubmission(){
    var max_marks = Number($("input[name=newtest_full_marks]").val());
    $("input[name=newtest_pass_marks]").attr("max", max_marks);
    var newTestData = getTestData();
    var testCount = $(".test-list").children();
    var res;
    $.ajax({
        type: "post",
        url: "testInteract",
        data: newTestData.encodedData,
        success: function(data) {
            if(Number(data) != 0)
            {   escapeFormWindow();
                var newTestTemplate = '<div class="test-list-item test-submitted" id="test'+ String(data) + '"><div class="test-title"><h5>' + newTestData.testData.title + '</h5></div><div class="test-info"><p class="desc">' + newTestData.testData.desc + '</p><span class="test-info-labels">Scheduled date of examination: </span><span>' + newTestData.testData.date + '</span> <br><span class="test-info-labels dept">Department: </span><span>' + deplist[newTestData.testData.dept] + '</span> <br><span class="test-info-labels batchYear">Batch: </span><span> ' + 20+newTestData.testData.batch + '</span> <br><span class="test-info-labels totalMarks">Maximum marks: </span><span>' + newTestData.testData.fullMarks + '</span><br><span class="test-info-labels">Alloted Time:'+newTestData.testData.duration+'</span><br></span><span> <br></div><div class="controls"><button class="start-test"><i class="fa fa-3x fa-hourglass-start"></i>Start now<button class="delete-test"><i class="fa fa-trash-o"></i>Delete</button></div></div>';
                $(".test-list").prepend(newTestTemplate);
            }
        },
        error: function(){
                alert('Request Failed');
            }
    })
    .done(function(data) {
       console.log(data);
    });     
}
function getTestData(){
    var testData = {
        title: $("input[name=newtest_title]").val(),
        desc: $("textarea[name=newtest_description]").val(),
        date: $("input[name=newtest_date]").val(),
        duration: $("input[name=newtest_duration]").val(),
        dept: $("select[name=newtest_department]").val(),
        batch: $("select[name=newtest_batch_year]").val(),
        fullMarks: $("input[name=newtest_full_marks]").val(),
        passMarks: $("input[name=newtest_pass_marks]").val(),
        total_ques: $(".question").length
    };
    var questions = $(".question").toArray();
    var answers = "";
    questions.forEach(function(ques){
        var temp_ans = $(ques).find("select[name=answer]").val();
        answers = answers + temp_ans
        var quesID = $(ques).attr("id");
        var temp_index = Number(quesID.match(/\d/g).join(""));
        var temp_title = $(ques).find("input[name=qs_"+ temp_index +"]").val();
        var temp_opt1 = $(ques).find("input[name=qs_"+ temp_index +"_choice_1]").val();
        var temp_opt2 = $(ques).find("input[name=qs_"+ temp_index +"_choice_2]").val();
        var temp_opt3 = $(ques).find("input[name=qs_"+ temp_index +"_choice_3]").val();
        var temp_opt4 = $(ques).find("input[name=qs_"+ temp_index +"_choice_4]").val();
        testData['question'+temp_index] = temp_title;
        testData['question'+temp_index+"_opt1"] = temp_opt1;
        testData['question'+temp_index+"_opt2"] = temp_opt2;
        testData['question'+temp_index+"_opt3"] = temp_opt3;
        testData['question'+temp_index+"_opt4"] = temp_opt4;
    });
    testData.answers = answers;
    var encodedData = $.param(testData);
    console.log(encodedData);
    return {encodedData: encodedData, testData: testData};
}
