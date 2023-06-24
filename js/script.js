const { none, show, active, hidden, opacity25, disabled } = {
    none: "d-none",
    show: 'show',
    active: 'active',
    hidden: 'overflow-hidden',
    opacity25: 'opacity-25',
    disabled: 'disabled'
}

$('#menu-icon').on('click', function (){
    if($(this).hasClass(active)){
        $(this).removeClass(active)
        $('.mobile-menu').removeClass(active)
    } else {
        $(this).addClass(active)
        $('.mobile-menu').addClass(active)
    }
});



const select = $('select[multiple]');


select.each((index, _select) => {
    const sel = $(_select);

    const options = sel.children('option');
    const div = $('<div />').addClass('selectMultiple');
    const activeSelect = $('<div />');
    const list = $('<ul />');
    const placeholder = sel.data('placeholder');

    const span = $('<span />').text(placeholder).appendTo(activeSelect);
    options.each(function() {
        const text = $(this).text();
        if($(this).is(':selected')) {
            activeSelect.append($('<a />').html('<em>' + text + '</em><i></i>'));
            span.addClass('hide');
        } else {
            list.append($('<li />').html(text));
        }
    });
    activeSelect.append($('<div />').addClass('arrow'));
    div.append(activeSelect).append(list);
    select.wrap(div);
})


$(document).on('click', '.selectMultiple ul li', function(e) {
    const select = $(this).parent().parent();
    const li = $(this);
    if(!select.hasClass('clicked')) {
        select.addClass('clicked');
        li.prev().addClass('beforeRemove');
        li.next().addClass('afterRemove');
        li.addClass('remove');
        const a = $('<a />').addClass('notShown').html('<em>' + li.text() + '</em><i></i>').hide().appendTo(select.children('div'));
        a.slideDown(400, function() {
            setTimeout(function() {
                a.addClass('shown');
                select.children('div').children('span').addClass('hide');
                select.find('option:contains(' + li.text() + ')').prop('selected', true);
            }, 500);
        });
        setTimeout(function() {
            if(li.prev().is(':last-child')) {
                li.prev().removeClass('beforeRemove');
            }
            if(li.next().is(':first-child')) {
                li.next().removeClass('afterRemove');
            }
            setTimeout(function() {
                li.prev().removeClass('beforeRemove');
                li.next().removeClass('afterRemove');
            }, 200);

            li.slideUp(400, function() {
                li.remove();
                select.removeClass('clicked');
            });
        }, 600);
    }
});

$(document).on('click', '.selectMultiple > div a', function(e) {
    const select = $(this).parent().parent();
    const self = $(this);
    self.removeClass().addClass('remove');
    select.addClass('open');
    setTimeout(function() {
        self.addClass('disappear');
        setTimeout(function() {
            self.animate({
                width: 0,
                height: 0,
                padding: 0,
                margin: 0
            }, 300, function() {
                const li = $('<li />').text(self.children('em').text()).addClass('notShown').appendTo(select.find('ul'));
                li.slideDown(400, function() {
                    li.addClass('show');
                    setTimeout(function() {
                        select.find('option:contains(' + self.children('em').text() + ')').prop('selected', false);
                        if(!select.find('option:selected').length) {
                            select.children('div').children('span').removeClass('hide');
                        }
                        li.removeClass();
                    }, 300);
                });
                self.remove();
            })
        }, 200);
    }, 300);
});

$(document).on('click', '.selectMultiple > div .arrow, .selectMultiple > div span', function() {
    $(this).parent().parent().toggleClass('open');
});



const ctx = document.getElementById('myChart');
const arrayMonth = Array.from({length: 31});


new Chart(ctx, {
    type: 'bar',
    data: {
        labels: arrayMonth.map((e, index) => index + 1),
        datasets: [{
            label: 'Usages',
            data: arrayMonth.map((e, i) => Math.floor(Math.random() * i + 5)),
            borderWidth: 0,
            borderDash: [10,5],
            borderRadius: 6,
            borderSkipped: false,
            backgroundColor: '#EFF1FF',
            hoverBackgroundColor: '#748EED',
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    beginAtZero:true
                },
                grid:{
                    color: '#E0E0E0',
                },
                border: {
                    dash: [2,4],
                },
            },
            x: {
                grid:{
                    color: '#E0E0E0',
                },
                border: {
                    dash: [2,4],
                },
            },
        },
    }
});