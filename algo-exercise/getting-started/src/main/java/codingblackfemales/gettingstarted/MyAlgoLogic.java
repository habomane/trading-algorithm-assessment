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

    private static final Logger logger = LoggerFactory.getLogger(MyAlgoLogic.class);

    @Override
    public Action evaluate(SimpleAlgoState state) {

        var orderBookAsString = Util.orderBookToString(state);

        logger.info("[MYALGO] The state of the order book is:\n" + orderBookAsString);

        BidLevel bid = state.getBidAt(0);
        AskLevel ask = state.getAskAt(0);

        long spread = (ask.getPrice() - bid.getPrice()) / ask.getPrice() ;

        if(spread >= 1) {
            long quantity =  Math.min(ask.getQuantity(), bid.getQuantity());
            return new CreateChildOrder(Side.BUY, quantity, ask.getPrice());
        } else {
            return NoAction.NoAction;
        }

    }
}
