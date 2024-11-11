package codingblackfemales.gettingstarted;

import codingblackfemales.action.Action;
import codingblackfemales.action.CreateChildOrder;
import codingblackfemales.action.NoAction;
import codingblackfemales.algo.AlgoLogic;
import codingblackfemales.sotw.ChildOrder;
import codingblackfemales.sotw.SimpleAlgoState;
import codingblackfemales.sotw.marketdata.AskLevel;
import codingblackfemales.sotw.marketdata.BidLevel;
import codingblackfemales.util.Util;
import messages.order.Side;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyAlgoLogic implements AlgoLogic {

    private long historicalStockAverage;
    private static final Logger logger = LoggerFactory.getLogger(MyAlgoLogic.class);

    MyAlgoLogic() {
        setHistoricalStockAverage();
    }

    @Override
    public Action evaluate(SimpleAlgoState state) {

        // Strategy:
        // We have a historical stock average over time.
        // If our price is significantly below the average, we trigger a buy.
        // A significant difference is considered a difference greater than 5.
        // Otherwise, we do not do an action.

        var orderBookAsString = Util.orderBookToString(state);

        logger.info("[MYALGO] The state of the order book is:\n" + orderBookAsString);

        AskLevel ask = state.getAskAt(0);

        if(ask.getPrice() -  historicalStockAverage > 5 ) {
            return new CreateChildOrder(Side.BUY, ask.getQuantity(), ask.getPrice());
        } else {
            return NoAction.NoAction;
        }

    }


    public void setHistoricalStockAverage() {
        // Logic here to retrieve historical average from another data store.
        // In the case of this example, historical average will be 98.
        // In an actual application, we would retrieve the historical trade average from database.

        this.historicalStockAverage = 98;
    }
}
