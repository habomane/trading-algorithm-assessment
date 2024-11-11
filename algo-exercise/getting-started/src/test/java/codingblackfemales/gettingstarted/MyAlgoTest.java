package codingblackfemales.gettingstarted;

import codingblackfemales.algo.AlgoLogic;
import codingblackfemales.sotw.ChildOrder;
import org.junit.*;
import java.util.*;


/**
 * This test is designed to check your algo behavior in isolation of the order book.
 *
 * You can tick in market data messages by creating new versions of createTick() (ex. createTick2, createTickMore etc..)
 *
 * You should then add behaviour to your algo to respond to that market data by creating or cancelling child orders.
 *
 * When you are comfortable you algo does what you expect, then you can move on to creating the MyAlgoBackTest.
 *
 */
public class MyAlgoTest extends AbstractAlgoTest {

    @Override
    public AlgoLogic createAlgoLogic() {
        //this adds your algo logic to the container classes
        return new MyAlgoLogic();
    }


    @Test
    public void testSignificantDifferenceSize() throws Exception {

        send(createTickValidDifference());
        Assert.assertEquals(2, container.getState().getChildOrders().size());
    }

    @Test
    public void testNoneDifferenceSize() throws Exception {

        send(createTickNoDifference());
        Assert.assertEquals(0, container.getState().getChildOrders().size());
    }

    @Test
    public void testSignificantDifferenceQuantity() throws Exception {

        send(createTickValidDifference());
        long sum = container.getState().getChildOrders().stream().mapToLong(ChildOrder::getQuantity).sum();
        Assert.assertEquals(1000, sum);
    }

    @Test
    public void testNoneDifferenceQuantity() throws Exception {

        send(createTickNoDifference());
        long sum = container.getState().getChildOrders().stream().mapToLong(ChildOrder::getQuantity).sum();
        Assert.assertEquals(0, sum);
    }

    @Test
    public void testSignificantDifferencePrice() throws Exception {

        send(createTickValidDifference());
        long sum = container.getState().getChildOrders().stream().mapToLong(ChildOrder::getPrice).sum();
        Assert.assertEquals(166, sum);
    }

    @Test
    public void testNoneDifferencePrice() throws Exception {

        send(createTickNoDifference());
        long sum = container.getState().getChildOrders().stream().mapToLong(ChildOrder::getPrice).sum();
        Assert.assertEquals(0, sum);
    }
}
