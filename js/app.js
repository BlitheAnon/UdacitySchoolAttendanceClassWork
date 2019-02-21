/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');

        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* STUDENT APPLICATION */
$(function() {
    // 模型层model
    var model = {
        attendanceCount: 12,
        studentArray: ["Slappy the Frog", "Lilly the Lizard", "Paulrus the Walrus", "Gregory the Goat", "Adam the Anaconda"],
        missed: 0
    }

    //章鱼连接层
    var octopus={
        //取得签到场数
        getAttendanceCount:function() {
            return model.attendanceCount
        },
        //取得学生名
        getStudentName: function() {
            return model.studentArray
        },

        //取得初始化缺席次数
        getMissedInit: function() {
            return model.missed
        },

        init: function() {
            view.init()
        }
    }

    //视图层
    var view={
        init: function() {
            //初始化数据
            //取得表头
            this.thead=$('thead').children(":first");
            //取得表体
            this.tbody=$('tbody')
            this.render()
        },

        render: function() {
            // 生成界面
            //生成表头
            let _head_html='<th class="name-col">Student Name</th>'
            for(let i=1;i<=octopus.getAttendanceCount();i++){
                _head_html+='<th>'+i+'</th>'
            }
            _head_html+='<th class="missed-col">Days Missed-col</th>'
            this.thead.append(_head_html)

            //生成学生签到表体
            let _attendace_body_html=''
            octopus.getStudentName().forEach(function(name) {
                _attendace_body_html+='<tr class="student">'
                _attendace_body_html+='<td class="name-col">'+name+'</td>'
                for (var i = 0; i < octopus.getAttendanceCount(); i++) {
                    _attendace_body_html+='<td class="attend-col"><input type="checkbox"></td>'
                }
                _attendace_body_html+='<td class="missed-col">'+octopus.getMissedInit()+'</td>'
                _attendace_body_html+='</tr>'
            })

            // console.log('getMissedInit');
            // console.log(octopus.getMissedInit());

            this.tbody.append(_attendace_body_html)
        }
    }

    //调用章鱼连接层启动界面
    octopus.init()


    // var attendance = JSON.parse(localStorage.attendance),
    //     $allMissed = $('tbody .missed-col'),
    //     $allCheckboxes = $('tbody input');
    //
    // // Count a student's missed days
    // function countMissing() {
    //     $allMissed.each(function() {
    //         var studentRow = $(this).parent('tr'),
    //             dayChecks = $(studentRow).children('td').children('input'),
    //             numMissed = 0;
    //
    //         dayChecks.each(function() {
    //             if (!$(this).prop('checked')) {
    //                 numMissed++;
    //             }
    //         });
    //
    //         $(this).text(numMissed);
    //     });
    // }
    //
    // // Check boxes, based on attendace records
    // $.each(attendance, function(name, days) {
    //     var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
    //         dayChecks = $(studentRow).children('.attend-col').children('input');
    //
    //     dayChecks.each(function(i) {
    //         $(this).prop('checked', days[i]);
    //     });
    // });
    //
    // // When a checkbox is clicked, update localStorage
    // $allCheckboxes.on('click', function() {
    //     var studentRows = $('tbody .student'),
    //         newAttendance = {};
    //
    //     studentRows.each(function() {
    //         var name = $(this).children('.name-col').text(),
    //             $allCheckboxes = $(this).children('td').children('input');
    //
    //         newAttendance[name] = [];
    //
    //         $allCheckboxes.each(function() {
    //             newAttendance[name].push($(this).prop('checked'));
    //         });
    //     });
    //
    //     countMissing();
    //     localStorage.attendance = JSON.stringify(newAttendance);
    // });
    //
    // countMissing();
}());
