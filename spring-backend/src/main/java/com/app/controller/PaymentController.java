package com.app.controller;

import java.math.BigInteger;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.OrderRequest;
import com.app.dto.OrderResponse;
import com.razorpay.*;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    private RazorpayClient client;

    private static final String id = "rzp_test_TPGOsj7k2QPYfW"; // Test key
    private static final String secret = "YN1gpFU90rfgpkFqQS1X9blb"; // Test secret

    @PostMapping("/createorder")
    public OrderResponse createOrder(@RequestBody OrderRequest orderRequest) throws RazorpayException {
        OrderResponse orderResponse = new OrderResponse();
        client = new RazorpayClient(id, secret); // Use test key and secret directly
        Order order = createRazorPayOrder(orderRequest.getAmount());
        System.out.println("-----------------Payment Started---------------");
        String orderId = (String) order.get("id");
        System.out.println("Order Id = " + orderId);
        orderResponse.setRazorPayOrderId(orderId);
        orderResponse.setAmount(orderRequest.getAmount());
        orderResponse.setId(id);
        orderResponse.setKey(id); // Ensure the correct key is returned
        orderResponse.setCid(orderRequest.getCid());
        orderResponse.setRid(orderRequest.getRid());
        System.out.println(orderResponse.toString());
        System.out.println(order);
        return orderResponse;
    }

    private Order createRazorPayOrder(double amount) throws RazorpayException {
        JSONObject options = new JSONObject();
        options.put("amount", amount * 100); // Amount in paise
        options.put("currency", "INR");
        options.put("receipt", "txn_123456");
        options.put("payment_capture", 1); // Auto-capture payment
        // Remove or comment out the "method" parameter to allow all payment methods
        // options.put("method", "upi");
        return client.orders.create(options);
    }
}
