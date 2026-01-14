import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSuccess(true);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      value: t('footer_address'),
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+998 90 123 45 67',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@uzbektravel.uz',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <div className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">{t('nav_contact')}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get in touch with us to plan your perfect Uzbekistan adventure
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="font-display text-2xl font-bold mb-8">Get in Touch</h2>
                <div className="space-y-6 mb-12">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map placeholder */}
                <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191884.83987964!2d69.11455!3d41.31152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-card">
                {isSuccess ? (
                  <div className="py-12 text-center animate-scale-in">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="+998 90 123 45 67" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your travel plans..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full btn-gradient text-lg py-6"
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
