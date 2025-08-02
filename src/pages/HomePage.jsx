import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Globe, ArrowRight, Sparkles, Users, TrendingUp } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Container, Section, Grid, Button, Card, CardContent } from '../components/ui';
import ContentCard from '../components/ContentCard';

const HomePage = () => {
  const { contents } = useContent();
  const featuredContent = contents.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <Section padding="lg" className="relative">
          <Container className="text-center">
            <div className="max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Powered by Web3 Technology</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-primary-100 bg-clip-text text-transparent">
                The secure, flexible content marketplace
              </h1>
              
              {/* Subheading */}
              <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto leading-relaxed">
                For creators and consumers - Upload, monetize, and access premium digital content
                with blockchain-powered security
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  as={Link}
                  to="/browse"
                  size="xl"
                  className="bg-white text-primary-700 hover:bg-primary-50 shadow-large"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Browse Content
                </Button>
                <Button
                  as={Link}
                  to="/creator"
                  variant="outline"
                  size="xl"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  Start Creating
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">10K+</div>
                  <div className="text-primary-200 text-sm">Active Creators</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">50K+</div>
                  <div className="text-primary-200 text-sm">Premium Content</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">$2M+</div>
                  <div className="text-primary-200 text-sm">Creator Earnings</div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </section>

      {/* Features Section */}
      <Section padding="lg" background="white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              Why Choose ContentVault?
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Built for the modern creator economy with security, flexibility, and ease of use at its core
            </p>
          </div>

          <Grid cols={3} responsive gap="lg">
            <Card 
              className="text-center group hover:shadow-large transition-all duration-300 hover:-translate-y-2" 
              variant="elevated" 
              padding="lg"
            >
              <CardContent>
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-secondary-900 mb-4">Secure & Private</h3>
                <p className="text-secondary-600 leading-relaxed">
                  Blockchain-powered security ensures your content and payments are protected with military-grade encryption
                </p>
              </CardContent>
            </Card>

            <Card 
              className="text-center group hover:shadow-large transition-all duration-300 hover:-translate-y-2" 
              variant="elevated" 
              padding="lg"
            >
              <CardContent>
                <div className="w-20 h-20 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-secondary-900 mb-4">Flexible Monetization</h3>
                <p className="text-secondary-600 leading-relaxed">
                  Choose from pay-per-view, subscriptions, or bundles. Set your own prices and keep more of your earnings
                </p>
              </CardContent>
            </Card>

            <Card 
              className="text-center group hover:shadow-large transition-all duration-300 hover:-translate-y-2" 
              variant="elevated" 
              padding="lg"
            >
              <CardContent>
                <div className="w-20 h-20 bg-gradient-to-br from-warning-500 to-warning-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-secondary-900 mb-4">Global Reach</h3>
                <p className="text-secondary-600 leading-relaxed">
                  Connect with audiences worldwide through our platform's advanced discovery and search capabilities
                </p>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Featured Content Section */}
      <Section padding="lg" background="gray">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending Now
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              Featured Content
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Discover premium content from our top creators and join thousands of satisfied learners
            </p>
          </div>

          <Grid cols={3} responsive gap="lg" className="mb-12">
            {featuredContent.map((content) => (
              <ContentCard
                key={content.id}
                content={content}
                showStats={true}
              />
            ))}
          </Grid>

          <div className="text-center">
            <Button
              as={Link}
              to="/browse"
              size="lg"
              rightIcon={<ArrowRight className="h-5 w-5" />}
              className="shadow-medium hover:shadow-large"
            >
              View All Content
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default HomePage;
