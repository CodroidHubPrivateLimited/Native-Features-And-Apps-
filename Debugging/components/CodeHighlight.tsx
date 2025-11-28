/**
 * CodeHighlight Component
 * 
 * Displays code with syntax highlighting.
 * Enhanced with basic syntax highlighting for common keywords and patterns.
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
interface CodeHighlightProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  title?: string;
}

export default function CodeHighlight({ 
  code, 
  language = 'javascript', 
  showLineNumbers = true,
  title 
}: CodeHighlightProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const copyToClipboard = () => {
    // Clipboard functionality - can be enhanced with expo-clipboard if needed
    // For now, this is a placeholder
    console.log('Copy to clipboard:', code.substring(0, 50) + '...');
  };

  const lines = code.split('\n');

  // Basic syntax highlighting for common keywords
  const highlightCode = (text: string) => {
    // Keywords
    const keywords = /\b(const|let|var|function|if|else|for|while|return|import|export|default|async|await|try|catch|finally|class|extends|interface|type|enum)\b/g;
    // Strings
    const strings = /(['"`])(?:(?=(\\?))\2.)*?\1/g;
    // Comments
    const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
    // Numbers
    const numbers = /\b\d+\.?\d*\b/g;

    let highlighted = text;
    
    // Highlight comments (gray)
    highlighted = highlighted.replace(comments, (match) => `{{COMMENT}}${match}{{/COMMENT}}`);
    
    // Highlight strings (green)
    highlighted = highlighted.replace(strings, (match) => `{{STRING}}${match}{{/STRING}}`);
    
    // Highlight keywords (blue)
    highlighted = highlighted.replace(keywords, (match) => `{{KEYWORD}}${match}{{/KEYWORD}}`);
    
    // Highlight numbers (orange)
    highlighted = highlighted.replace(numbers, (match) => `{{NUMBER}}${match}{{/NUMBER}}`);

    return highlighted;
  };

  const renderHighlightedLine = (line: string) => {
    const highlighted = highlightCode(line);
    const parts = highlighted.split(/(\{\{[^}]+\}\}[^{]*\{\{\/[^}]+\}\})/g);
    
    return (
      <Text style={styles.codeText}>
        {parts.map((part, i) => {
          if (part.startsWith('{{COMMENT}}')) {
            const text = part.replace(/\{\{COMMENT\}\}/g, '').replace(/\{\{\/COMMENT\}\}/g, '');
            return <Text key={i} style={styles.comment}>{text}</Text>;
          }
          if (part.startsWith('{{STRING}}')) {
            const text = part.replace(/\{\{STRING\}\}/g, '').replace(/\{\{\/STRING\}\}/g, '');
            return <Text key={i} style={styles.string}>{text}</Text>;
          }
          if (part.startsWith('{{KEYWORD}}')) {
            const text = part.replace(/\{\{KEYWORD\}\}/g, '').replace(/\{\{\/KEYWORD\}\}/g, '');
            return <Text key={i} style={styles.keyword}>{text}</Text>;
          }
          if (part.startsWith('{{NUMBER}}')) {
            const text = part.replace(/\{\{NUMBER\}\}/g, '').replace(/\{\{\/NUMBER\}\}/g, '');
            return <Text key={i} style={styles.number}>{text}</Text>;
          }
          return <Text key={i}>{part}</Text>;
        })}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {title && (
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
            <Text style={[styles.copyText, { color: colors.tint }]}>Copy</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={true}
        style={[styles.scrollView, { backgroundColor: '#1e1e1e' }]}
      >
        <View style={styles.codeContainer}>
          {lines.map((line, index) => (
            <View key={index} style={styles.line}>
              {showLineNumbers && (
                <Text style={styles.lineNumber}>{index + 1}</Text>
              )}
              {renderHighlightedLine(line || ' ')}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  copyButton: {
    padding: 5,
  },
  copyText: {
    fontSize: 14,
  },
  scrollView: {
    borderRadius: 8,
    maxHeight: 400,
  },
  codeContainer: {
    padding: 15,
  },
  line: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  lineNumber: {
    color: '#858585',
    marginRight: 15,
    minWidth: 30,
    textAlign: 'right',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  codeText: {
    color: '#d4d4d4',
    fontSize: 12,
    fontFamily: 'monospace',
    flex: 1,
  },
  keyword: {
    color: '#569cd6',
    fontWeight: '600',
  },
  string: {
    color: '#ce9178',
  },
  comment: {
    color: '#6a9955',
    fontStyle: 'italic',
  },
  number: {
    color: '#b5cea8',
  },
});

