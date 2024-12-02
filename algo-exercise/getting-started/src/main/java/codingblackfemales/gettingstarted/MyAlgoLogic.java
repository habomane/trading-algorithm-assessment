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

        String orderBookAsString = Util.orderBookToString(state);

        logger.info("[MYALGO] The state of the order book is:\n" + orderBookAsString);

        AskLevel ask = state.getAskAt(0);
        BidLevel bid = state.getBidAt(0);

        if(ask.getPrice() > bid.getPrice()) {
            long quantity = Math.min(bid.getQuantity(), ask.getQuantity());
            return new CreateChildOrder(Side.SELL, quantity, ask.getPrice() );
        } else {
            return new CreateChildOrder(Side.BUY, bid.getQuantity(), ask.getPrice());
        }

    }

}
