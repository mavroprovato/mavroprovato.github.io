---
layout: post
title: "Use JSSE SSL for Weblogic 10"
date: 2013-05-16 00:46
comments: true
categories:
---

Recently I needed to change an existing web service, which was deployed on a Weblogic 10 server, in order to use HTTPS instead of HTTP. My initial thought was that it would be easy to implement: Just enable HTTPS in Weblogic and change the endpoint URI in the PHP Client that was calling the web service. Well, as it turned out, it wasn't that easy.

For this demonstration, lets say that we have this simple web service deployed in Weblogic:

{% highlight java %}
import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public class Hello {

    @WebMethod
    public String sayHello(@WebParam(name = "name") String name) {
        return "Hello, " + name + "!";
    }
}
{% endhighlight %}

The client for the web service is equally simple:

{% highlight php %}
<?php
$client = new SoapClient("https://localhost:7002/ws-sample/HelloService?WSDL");
print_r($client->sayHello(array("name" => "World")));
?>
{% endhighlight %}

But, if you run the PHP script against a Weblogic server with the default HTTPS configuration (for example, you just clicked on the *SSL Listen Port Enabled* check box) then you will get the following error:

{% highlight text %}
PHP Fatal error:  SOAP-ERROR: Parsing WSDL: Couldn't load from 'https://localhost:7002/ws-sample/HelloService?WSDL' : failed to load external entity "https://localhost:7002/ws-sample/HelloService?WSDL"
 in /home/mavroprovato/Tmp/test.php on line 2
PHP Fatal error:  Uncaught SoapFault exception: [WSDL] SOAP-ERROR: Parsing WSDL: Couldn't load from 'https://localhost:7002/ws-sample/HelloService?WSDL' : failed to load external entity "https://localhost:7002/ws-sample/HelloService?WSDL"
 in /home/mavroprovato/Tmp/test.php:2
Stack trace:
#0 /home/mavroprovato/Tmp/test.php(2): SoapClient->SoapClient('https://localho...')
#1 {main}
  thrown in /home/mavroprovato/Tmp/test.php on line 2
{% endhighlight %}

My first instinct was to blame PHP for everything. PHP is the root of all evil, right?!? Well, not so fast:

{% highlight bash %}
$ wget https://localhost:7002/ws-sample/HelloService?WSDL
--2013-05-16 01:24:35--  https://localhost:7002/ws-sample/HelloService?WSDL
Resolving localhost (localhost)... ::1, 127.0.0.1
Connecting to localhost (localhost)|::1|:7002... connected.
OpenSSL: error:140770FC:SSL routines:SSL23_GET_SERVER_HELLO:unknown protocol
Unable to establish SSL connection.
{% endhighlight %}

After this, I tried may things: Generating a proper certificate for the Weblogic server, adding the certificate to the trusted certificates for the client, even updating the OpenSSL version in the client. Needless to say, nothing worked. After much googling, I found references about a check box, named *Use JSSE SSL*, buried under the Advanced section of the SSL configuration of the Weblogic server.

![Weblogic SSL]({{ site.url }}/images/weblogic_ssl.png)

After checking that checkbox everything worked. wget would happily fetch the WSDL file and the PHP client would work as expected.

[Digging more into the Weblogic documentation](http://docs.oracle.com/cd/E23943_01/web.1111/e13707/ssl.htm#BABFDJGB) reveals that selecting this check box switches from a custom SSL implementation, to the standard one that comes with Java 6. It also mentions that it is deprecated: indeed, Weblogic 12c only comes with the standard SSL implementation and this option is absent. So, next time you encounter any SSL issues with Weblogic 10, it is worth trying to change the value of that option and see how that works.
