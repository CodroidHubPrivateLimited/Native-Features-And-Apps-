
import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styles/index.styles';
import { fetchNews, fetchTopHeadlines } from './utils/newsApi';
import { NewsArticle } from './types';

 
export default function App() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Load top headlines when app starts
  useEffect(() => {
    loadTopHeadlines();
  }, []);

  // Function to load top headlines
  const loadTopHeadlines = async () => {
    setLoading(true);
    setError('');
    try {
      const news = await fetchTopHeadlines('general', 10);
      setArticles(news);
    } catch (err) {
      setError('Failed to load news. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to search news
  const searchNews = async () => {
    if (!searchQuery.trim()) {
      return;
    }
    
    setLoading(true);
    setError('');
    try {
        const news = await fetchNews(searchQuery, 10);
      setArticles(news);
    } catch (err) {
      setError('Failed to search news. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="auto" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>📰 News App</Text>

        {/* Search Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search News</Text>
          
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search for news..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={searchNews}
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.button} onPress={searchNews}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#34C759' }]} 
              onPress={loadTopHeadlines}
            >
              <Text style={styles.buttonText}>Top Headlines</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Loading State */}
        
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading news...</Text>
          </View>
        )}

        {/* Error State */}
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        {/* Empty State */}
        {!loading && articles.length === 0 && !error && (
          <Text style={styles.emptyText}>No news articles found</Text>
        )}

        {/* News Articles */}
        {articles.length > 0 && (
          <View style={styles.newsList}>
            {articles.map((article, index) => (
              <View key={index} style={styles.newsCard}>
                <Text style={styles.newsTitle}>{article.title}</Text>
                <Text style={styles.newsDescription}>
                  {article.description || 'No description available'}
                </Text>
                <Text style={styles.newsSource}>
                  Source: {article.source?.name || 'Unknown'}
                </Text>
                <Text style={styles.newsDate}>
                  {new Date(article.publishedAt).toLocaleDateString()}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

