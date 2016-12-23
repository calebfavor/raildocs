Send an Email?
===================================================

(Pianote)

Create a file...
* in /app/Mail directory
* namespace App\Mail
* extends Mailable
* traits: Queueable, SerializesModels
* methods: __contructor and build

When you go to send an email, you'll create an instance of this class using the `new` keyboard. Thus, any information you need will be passed in a parameter then and must come in to this class via the contructor

For example, from "App\Services\Ecommerce\InvoiceService", we declare

```php
    public function sendRenewalSubscriptionInvoice(User $user, Subscription $subscription, Payment $payment)
    {
        $email = new RenewalInvoice($user, $subscription, $payment, $this->productDataMapper);

        $this->mailer->send($email);
    }
```

The constructor of that RenewalInvoice looks like this:

```php
    private $user;
    private $subscription;
    private $payment;
    private $productDataMapper;

    public function __construct(
        User $user,
        Subscription $subscription,
        Payment $payment,
        ProductDataMapper $productDataMapper
    )
    {
        $this->user = $user;
        $this->subscription = $subscription;
        $this->payment = $payment;
        $this->productDataMapper = $productDataMapper;
    }
```
The "build" method of your Mailable class will set the information for the email, then return itself.

Here's an example from "App\Mail\RenewalInvoice".

```php
    public function build()
    {
        return $this
            ->to($this->user->getEmail())
            ->from('support@pianote.com', 'Pianote Support')
            ->subject('Your Subscription has been renewed! Thank you!')
            ->view('emails.ecommerce.order-invoice')
            ->with(
                [
                    'createdAt' => $this->payment->getCreatedAt(),
                    'id' => $this->payment->getId(),
                    'toEmail' => $this->user->getEmail(),
                    'billingAddress' => $this->subscription->getPaymentMethod()->getMethod()->getAddress(),
                    'payment' => $this->payment,
                    'paymentMethod' => $this->subscription->getPaymentMethod(),
                    'paid' => $this->payment->getPaid(),
                    'due' => $this->payment->getDue(),
                    'orderItems' => null,
                    'product' => $this->productDataMapper->get($this->subscription->getProductId()),
                    'subscription' => $this->subscription,
                    'tax' => $this->subscription->getTax(),
                    'shipping' => $this->subscription->getShipping(),
                ]
            );
    }
```

The "with" method is setting the data available in the view.

Create your view. The view for the above code example would be "*/resources/views/emails/order-invoice.blade.php*"

Ok, so now you've got your email entity. What do you do with it.

From whereever you want to set it, create it

```php
$email = new SupportEmail($input);
```

And then send it by statically calling the "send" method of "\Illuminate\Mail\Mailer" (though note that it "goes throught" "Illuminate\Support\Facades\Mail")

```php
Mail::send($email);
```

Remember that InvoiceService code snippet up top?

```php
    public function sendRenewalSubscriptionInvoice(User $user, Subscription $subscription, Payment $payment)
    {
        $email = new RenewalInvoice($user, $subscription, $payment, $this->productDataMapper);

        $this->mailer->send($email);
    }
```

EZ right?

Here's another example (from App\Http\Controllers\Support\SupportEmailJsonController)

```php
    public function sendEmailFromContactFormInput()
    {
        $input = Input::get();
        $request = Request::capture();
        $this->validate($request, [
            'customerEmail' => 'required|email',
            'bodyText' => 'required'
        ]);
        $input['httpUserAgent'] = $_SERVER['HTTP_USER_AGENT'];
        $email = new SupportEmail($input);
        Mail::send($email);
        return JsonResponse::create(['originalRequest' => $input]);
    }
```

Notice that even though there's a lot more going on, as far as sending the email goes, we're still just creating it, then passing it to Mail@send.