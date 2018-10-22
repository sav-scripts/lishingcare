/**
 * Created by sav on 2018/10/19.
 */
(function(){

    window.Calender = Calender;

    function Calender($container, startDate, $parent, onDateClicked)
    {
        var self = this;

        //self._$container = $('<div class="sav-calender"></div>');
        self._$container = $container;
        self._onDateClicked = onDateClicked;

        self._$parent = $parent || $('body');

        $container.find(".arrow-left").on("click", function(event)
        {
            event.preventDefault();

            self.toPrevMonth();
        });

        $container.find(".arrow-right").on("click", function(event)
        {
            event.preventDefault();

            self.toNextMonth();
        });

        var date = startDate || new Date();
        //var date = new Date('2018-10-21');

        console.log(date);
        //console.log(date.getYear());
        //console.log(date.getMonth());
        //console.log(date.getDate());
        //console.log(date.getDay());

        self.updateDate(date);

        getNumDatesInMonth(date);
    }

    Calender.prototype =
    {
        _isHiding: true,

        _$container: undefined,

        _$parent: undefined,

        _date: undefined,

        _onDateClicked: undefined,

        _eventDataDic: {},
        _eventDataList: [],

        toNextMonth: function()
        {
            this._date.setMonth(this._date.getMonth() + 1);
            this.updateDate();
        },

        toPrevMonth: function()
        {
            this._date.setMonth(this._date.getMonth() - 1);
            this.updateDate();
        },

        toEventByIndex: function(index)
        {
            var self = this;
            var eventData = self._eventDataList[index];
            if(eventData)
            {
                var date = new Date(eventData.year+'-'+eventData.month+'-'+eventData.date);

                self.updateDate(date);
            }
        },

        updateDate: function(date)
        {
            if(!date)
            {
                date = this._date;
            }
            else
            {
                this._date = date;
            }

            var self = this,
                $container = self._$container,
                $dateBlocks = $container.find(".date-part .date-block"),
                numDates = getNumDatesInMonth(date),
                now = new Date(date.getTime());

            $dateBlocks.toggleClass("disable-mode", true);

            $container.find(".year-part .text").text(date.getFullYear() + " . " + (date.getMonth()+1));
            $dateBlocks.find(".date-text").empty();

            var i,
                day,
                row = 0,
                childIndex,
                year = date.getFullYear(),
                month = date.getMonth() + 1,
                d = self._eventDataDic,
                monthEventData,
                eventDataArray,
                eventData,
                $dateBlock,
                $eventContainer,
                $eventNode;

            if(d[year] && d[year][month])
            {
                monthEventData = d[year][month];
            }

            //console.log("year = " + year + ", month = " + month);

            for(i=1; i<=numDates;i++)
            {
                now.setDate(i);
                day = now.getDay();
                childIndex = day + (row * 7);
                $dateBlock = $($dateBlocks[childIndex]);
                $dateBlock.find(".date-text").text(i);

                $dateBlock.find(".event-container").detach();

                $dateBlock.toggleClass("disable-mode", false);

                if(monthEventData)
                {
                    eventDataArray = monthEventData[i];

                    if(eventDataArray)
                    {
                        bindClickFunc($dateBlock, eventDataArray);

                        $eventContainer = $('<div class="event-container"></div>');
                        $dateBlock.append($eventContainer);

                        $dateBlock.eventDataArray = eventDataArray;
                        //console.log(eventDataArray);
                        for(var k=0;k<eventDataArray.length;k++)
                        {
                            eventData = eventDataArray[k];

                            $eventNode = $('<div class="event-node"></div>');
                            $eventContainer.append($eventNode);

                            if(eventData.is_booked == 'true')
                            {
                                $eventNode.toggleClass('booked', true);
                            }
                        }
                    }
                    else
                    {
                        $dateBlock.eventDataArray = undefined;
                        $dateBlock.unbind("click");
                    }
                }
                else
                {
                    $dateBlock.eventDataArray = undefined;
                    $dateBlock.unbind("click");
                }


                if(day === 6) row ++;
            }

            function bindClickFunc($dateBlock, eventDataArray)
            {

                $dateBlock.on("click", function(event)
                {
                    event.preventDefault();

                    if(self._onDateClicked)
                    {
                        self._onDateClicked.call(null, eventDataArray);
                    }
                });

            }

        },

        addEvent: function(dataObj)
        {
            var self = this,
                eventDataDic = self._eventDataDic;

            var year = dataObj.year,
                month = dataObj.month,
                date = dataObj.date;

            eventDataDic[year] = eventDataDic[year] || {};
            eventDataDic[year][month] = eventDataDic[year][month] || {};
            var eventDataArray = eventDataDic[year][month][date] = eventDataDic[year][month][date] || [];

            eventDataArray.push(dataObj);
            //eventData.rawData = dataObj;

            self._eventDataList.push(dataObj);
        },

        show: function()
        {
            var self = this;
            if(!self._isHiding) return;
            self._isHiding = true;

            self._$parent.append(self._$container);
        }
    };

    function getNumDatesInMonth(date)
    {
        date = new Date(date.getTime());

        var start = 28,
            numDates = start;

        for(var i=0;i<5;i++)
        {
            date.setDate(start);

            if(date.getDate() === 1)
            {
                break;
            }
            else
            {
                numDates = start;
                start++;
            }
        }

        //console.log("num dates = " + numDates);

        return numDates;

    }

}());