

(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
		$screen = $.screen,
        $inArray = $.inArray;

    $(function() {

		//사이드
		var $container = $('#container'),
			$side = $container.find('.side'),
			$sideDepthItem = $side.find('.depth_item'),
			$sideSpy = $side.find('.spy:last');

		$sideDepthItem.on('click.menu', function(event) {
			var $this = $(this),
				$depthText = $this.children('.depth_text'),
				eventTarget = event.target,
				IsActive = $this.is('.active');

			if($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
				if($this.hasClass('depth1_item')) {
					if($this.hasClass('active')) {
						$html.removeClass('side_open');
					}else{
						$html.addClass('side_open');
					}
				}

				if($this.children('.depth').length) {
					var $Depth = $this.children('.depth'),
						DepthDisplay = $Depth.css('display');
					if(DepthDisplay!=='none'){//하위메뉴가 display:none이 아니면 실행
						if(!IsActive){
							$this.removeClass('active_prev active_next');
							$this.addClass('active').siblings('.depth_item').removeClass('active active_prev active_next');
							$this.prev('.depth_item').addClass('active_prev');
							$this.next('.depth_item').addClass('active_next');
						} else{
							$this.removeClass('active');
							$this.siblings('.depth_item').removeClass('active_prev active_next');
						}
						event.preventDefault();
					}
				}
			}

			event.stopPropagation();
		}).each(function(index, element) {
			var $element = $(element);

			if($element.children('.depth').length) {
				$element.addClass('has');
			}else{
				$element.addClass('solo');
			}
		});

		if($sideSpy.length) {
			$html.addClass('side_open');
			$sideSpy.parents('.depth_item').addClass('active');
			$sideSpy.parents('.depth_item').prev('.depth_item').addClass('active_prev');
			$sideSpy.parents('.depth_item').next('.depth_item').addClass('active_next');
		}

		//여기서부터 코드 작성해주세요

		$('.tab_menu').not($('.prettyprint').children()).each(function() {
			var li_length = $(this).children('ul').find('li').length;
			$(this).addClass('divide'+li_length);
		});

		$('table.table.responsive').not($('.prettyprint').children()).each(function() {
			var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
				TheadExist = $(this).find('thead').length;
			if((RowSpanExist==false) && (TheadExist!=0)){//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
				$(this).children('tbody').children('tr').find('th, td').each(function() {
					var ThisIndex = $(this).index(),
						TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
					$(this).attr('data-content', TheadText);
				});
				$(this).children('tfoot').children('tr').find('th, td').each(function() {
					var ThisIndex = $(this).index(),
						TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
					$(this).attr('data-content', TheadText);
				});
			};
		});

        // sub > pathbox

        var $pathBox = $('.sub_head .pathbox'),
            $pathItem = $pathBox.find('.path_item');
        $pathItem.each(function () {
            var $this = $(this),
                $thisbtn = $this.find('.path_btn'),
                $thislist = $this.find('.path_selectlist');

            $thislist.closest($pathItem).addClass('has');
        });

        $('.pathbox button.path_btn').on('click', function () {

            var $this = $(this),
                $parent = $this.parent('.path_item'),
                $silbing = $this.siblings('.path_selectlist');
            if($parent.hasClass('active')){
                $parent.removeClass('active');
                $this.attr('title', '열기');
                $silbing.slideUp();
            }else{
                $parent.addClass('active').siblings('.path_item').removeClass('active').find('button.path_btn').attr('title', '열기').siblings('.path_selectlist').slideUp();
                $this.attr('title', '닫기');
                $silbing.slideDown();
            }
        });

        $('.sharebox .share_btn.sns_share').on('click', function () {
            var $this = $(this),
                $list = $this.parent('.share_wrap').find('.share_list');

            if($this.parent('.share_wrap').hasClass('active')){
                $this.attr('title', 'sns 공유하기 열기').parent('.share_wrap').removeClass('active');
                $list.slideUp();
            }else{
                $this.attr('title', 'sns 공유하기 닫기').parent('.share_wrap').addClass('active');
                $list.slideDown();
            }

        });


		$(document).on('click', '.tab_buttons .tab_btn', function() {
            var $this = $(this),
                $myParent = $this.closest('li'), // li 요소 선택
                $siblings = $myParent.siblings(), // li 형제 요소 선택
                index = $myParent.index(), // 클릭한 탭의 인덱스
				$tabContents = $myParent.closest('.cts1_wrap').find('.tab_contents'),
				$tab_con = $tabContents.find('.tab_con');

            // 모든 탭 버튼에서 active 클래스 제거
            $siblings.removeClass('active');
            $myParent.addClass('active');

            // 모든 탭 콘텐츠에서 active 클래스 제거

            // 클릭한 탭 버튼의 인덱스에 따라 해당 콘텐츠 활성화
            $tab_con.removeClass('active').eq(index).addClass('active');

            console.log('클릭된 탭:', $this.text());
            console.log('활성화된 콘텐츠 인덱스:', index);
        });

		$(window).on('load',function(){
			var $randomNumberElement = $('#random-number');
			var interval;

			function getRandomNumber() {
				return Math.floor(1000 + Math.random() * 9000); // 4자리 무작위 숫자 생성
			}

			function startCounting() {
				interval = setInterval(function() {
					$randomNumberElement.text(getRandomNumber());
				}, 100); // 100ms마다 숫자 변경
			}

			function stopCounting() {
				clearInterval(interval);
				$randomNumberElement.text('1994'); // 1994로 설정
			}

			startCounting();

			setTimeout(function() {
				stopCounting();
			}, 3000); // 3초 후에 숫자 변경 멈춤
		});

        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);