/**
 * Created by sav on 2018/10/19.
 */
(function(){

    window.Calender = Calender;

    function Calender($container, startDate)
    {
        var self = this;

        //self._$container = $('<div class="sav-calender"></div>');
        self._$container = $container;

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

        _date: undefined,

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
                $dateBlock;

            for(i=1; i<=numDates;i++)
            {
                now.setDate(i);
                day = now.getDay();
                childIndex = day + (row * 7);
                $dateBlock = $($dateBlocks[childIndex]);
                $dateBlock.find(".date-text").text(i);

                $dateBlock.toggleClass("disable-mode", false);

                if(day === 6) row ++;
            }

        },

        show: function()
        {
            var self = this;
            if(!self._isHiding) return;
            self._isHiding = true;

            $('body').append(self._$container);
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