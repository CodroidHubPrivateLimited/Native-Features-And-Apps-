/**
 * Debugging Cases Data
 * Contains all 12 debugging cases with metadata, buggy code, fixed code, and hints
 */

export interface DebuggingCase {
  id: number;
  title: string;
  bug: string;
  root_cause: string;
  demonstrates: string[];
  debug_methods: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string[];
  estimated_time: string;
  problem_description: {
    expected: string;
    actual: string;
    context: string;
  };
  hints: string[];
  solution_explanation: {
    why_wrong: string;
    why_caused_issue: string;
    how_to_fix: string;
    best_practices: string;
  };
  learn_more: {
    docs: string[];
    related_cases: number[];
    external_resources: string[];
  };
  test_steps: {
    buggy: string[];
    fixed: string[];
  };
  platform_notes?: {
    android?: string;
    ios?: string;
  };
}

export const debuggingCases: DebuggingCase[] = [
  {
    id: 1,
    title: 'State Update Not Rendering',
    bug: 'Component state updates but UI doesn\'t re-render',
    root_cause: 'Direct mutation of state instead of creating new reference (useState/setState misuse)',
    demonstrates: ['state management', 'immutability'],
    debug_methods: ['React DevTools', 'console.log', 'render count logs'],
    difficulty: 'beginner',
    category: ['State Management', 'React Hooks'],
    estimated_time: '10 min',
    problem_description: {
      expected: 'Clicking the button should increment the counter and display the new value',
      actual: 'Counter value doesn\'t change visually even though state appears to update',
      context: 'Common when mutating objects/arrays directly instead of creating new references'
    },
    hints: [
      'Check how the state is being updated - are you modifying the existing object/array?',
      'React requires immutable updates. Look at line 15-17 where the state is being mutated directly.',
      'Replace the direct mutation with a new object/array. Use spread operator or create a new reference.'
    ],
    solution_explanation: {
      why_wrong: 'Directly mutating state (e.g., state.count++) doesn\'t trigger React\'s re-render mechanism because React uses shallow comparison to detect changes.',
      why_caused_issue: 'React compares object references, not values. When you mutate the same object, the reference stays the same, so React thinks nothing changed.',
      how_to_fix: 'Always create a new reference when updating state. Use spread operator for objects/arrays or return a new primitive value.',
      best_practices: 'Never mutate state directly. Use functional updates when the new state depends on the previous state. Consider using immer for complex nested updates.'
    },
    learn_more: {
      docs: [
        'https://react.dev/reference/react/useState',
        'https://react.dev/learn/updating-objects-in-state',
        'https://react.dev/learn/updating-arrays-in-state'
      ],
      related_cases: [9, 11],
      external_resources: [
        'React State Updates Guide',
        'Immutability in React'
      ]
    },
    test_steps: {
      buggy: [
        '1. Open the app and navigate to Case 1',
        '2. Click the "Increment Counter" button',
        '3. Observe that the counter value doesn\'t change visually',
        '4. Check console logs - state value may show updates but UI doesn\'t reflect it'
      ],
      fixed: [
        '1. After applying the fix, click the "Increment Counter" button',
        '2. Counter should increment and display correctly',
        '3. Multiple clicks should show sequential increments'
      ]
    }
  },
  {
    id: 2,
    title: 'Undefined is Not an Object (Null Reference)',
    bug: 'Accessing property on undefined/null object',
    root_cause: 'API data not loaded before render; missing optional chaining',
    demonstrates: ['conditional rendering', 'optional chaining', 'nullish coalescing'],
    debug_methods: ['stack trace', 'breakpoints', 'console.log'],
    difficulty: 'beginner',
    category: ['Error Handling', 'Async Data'],
    estimated_time: '15 min',
    problem_description: {
      expected: 'App should display user data after loading, or show loading state while fetching',
      actual: 'App crashes with "Cannot read property \'name\' of undefined" error',
      context: 'Common when accessing nested properties of data that hasn\'t loaded yet'
    },
    hints: [
      'Check where the error occurs - it\'s likely accessing a property before data is available',
      'Look at the render method around line 20-25. The component tries to access user.name before user is defined.',
      'Add optional chaining (?.) or conditional rendering to check if data exists before accessing properties.'
    ],
    solution_explanation: {
      why_wrong: 'Accessing properties on undefined/null without checking if the object exists first.',
      why_caused_issue: 'When async data is loading, the initial state is often null/undefined. Accessing properties on these values throws errors.',
      how_to_fix: 'Use optional chaining (?.), nullish coalescing (??), or conditional rendering to safely access nested properties.',
      best_practices: 'Always initialize state appropriately. Use loading states. Consider TypeScript for type safety. Use error boundaries for graceful error handling.'
    },
    learn_more: {
      docs: [
        'https://react.dev/learn/conditional-rendering',
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining',
        'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary'
      ],
      related_cases: [5, 8],
      external_resources: [
        'Optional Chaining MDN',
        'Error Boundaries in React'
      ]
    },
    test_steps: {
      buggy: [
        '1. Navigate to Case 2',
        '2. App should crash immediately with undefined error',
        '3. Check the error stack trace to see the exact line'
      ],
      fixed: [
        '1. After fix, app should show loading state initially',
        '2. Then display user data without crashing',
        '3. Test with slow network to see loading state'
      ]
    }
  },
  {
    id: 3,
    title: 'FlatList Performance Issues',
    bug: 'Laggy scrolling with large lists',
    root_cause: 'Missing keyExtractor, no memoization, heavy render functions',
    demonstrates: ['FlatList optimization', 'memo', 'getItemLayout'],
    debug_methods: ['Performance Monitor', 'React Profiler'],
    difficulty: 'intermediate',
    category: ['Performance', 'Lists'],
    estimated_time: '20 min',
    problem_description: {
      expected: 'Smooth scrolling through a list of 1000+ items',
      actual: 'List scrolls with noticeable lag, frame drops, and stuttering',
      context: 'Common in apps displaying large datasets without proper optimization'
    },
    hints: [
      'Check the FlatList implementation - are there missing optimization props?',
      'Look for missing keyExtractor, heavy renderItem function, and lack of memoization around line 30-40.',
      'Add keyExtractor, memoize the renderItem component, add getItemLayout if items have fixed height, and use removeClippedSubviews.'
    ],
    solution_explanation: {
      why_wrong: 'FlatList without optimization props re-renders all items on scroll, causing performance issues.',
      why_caused_issue: 'Without keyExtractor, React can\'t efficiently track items. Without memoization, every scroll triggers re-renders. Heavy render functions compound the problem.',
      how_to_fix: 'Add keyExtractor, memoize list items with React.memo, use getItemLayout for fixed-height items, enable removeClippedSubviews, and optimize renderItem.',
      best_practices: 'Always provide keyExtractor. Memoize list items. Use getItemLayout for fixed heights. Consider virtualization for very large lists. Profile with React DevTools Profiler.'
    },
    learn_more: {
      docs: [
        'https://reactnative.dev/docs/optimizing-flatlist-configuration',
        'https://reactnative.dev/docs/flatlist#props',
        'https://react.dev/reference/react/memo'
      ],
      related_cases: [11],
      external_resources: [
        'React Native Performance',
        'FlatList Best Practices'
      ]
    },
    test_steps: {
      buggy: [
        '1. Navigate to Case 3',
        '2. Scroll through the list quickly',
        '3. Observe lag, stuttering, and frame drops',
        '4. Check Performance Monitor - FPS should drop below 60'
      ],
      fixed: [
        '1. After fix, scroll should be smooth',
        '2. FPS should remain near 60',
        '3. Test with even larger lists (5000+ items)'
      ]
    }
  },
  {
    id: 4,
    title: 'Memory Leak from Uncleared Timers',
    bug: 'App slows down over time, memory increases',
    root_cause: 'setInterval/setTimeout not cleared on unmount',
    demonstrates: ['useEffect cleanup', 'component lifecycle'],
    debug_methods: ['Memory profiler', 'unmount logs'],
    difficulty: 'intermediate',
    category: ['Memory Management', 'Lifecycle'],
    estimated_time: '15 min',
    problem_description: {
      expected: 'Timer should run while component is mounted and stop when unmounted',
      actual: 'Timer continues running after component unmounts, causing memory leaks',
      context: 'Common when timers or subscriptions aren\'t cleaned up properly'
    },
    hints: [
      'Check the useEffect hook - is there a cleanup function?',
      'Look at the useEffect around line 15. The setInterval is created but never cleared.',
      'Add a cleanup function in useEffect that clears the interval when component unmounts.'
    ],
    solution_explanation: {
      why_wrong: 'Timers and subscriptions created in useEffect continue running after component unmounts if not cleaned up.',
      why_caused_issue: 'Without cleanup, timers keep running, holding references to components, preventing garbage collection, and causing memory leaks.',
      how_to_fix: 'Return a cleanup function from useEffect that clears timers, cancels subscriptions, or removes event listeners.',
      best_practices: 'Always clean up side effects in useEffect. Use cleanup for timers, subscriptions, event listeners, and any async operations. Consider using libraries like react-use for common patterns.'
    },
    learn_more: {
      docs: [
        'https://react.dev/reference/react/useEffect#cleanup',
        'https://react.dev/learn/synchronizing-with-effects#cleanup',
        'https://reactnative.dev/docs/timers'
      ],
      related_cases: [11],
      external_resources: [
        'React useEffect Cleanup',
        'Memory Leaks in React'
      ]
    },
    test_steps: {
      buggy: [
        '1. Navigate to Case 4',
        '2. Observe timer running',
        '3. Navigate away from the screen',
        '4. Check memory profiler - memory should continue increasing',
        '5. Check console - timer logs should continue after unmount'
      ],
      fixed: [
        '1. After fix, timer should stop when navigating away',
        '2. Memory should stabilize',
        '3. Console logs should stop after unmount'
      ]
    }
  },
  {
    id: 5,
    title: 'Async/Await Error Handling',
    bug: 'Unhandled promise rejection crashes app',
    root_cause: 'Missing try-catch in async functions',
    demonstrates: ['async error handling', 'error boundaries', 'Sentry'],
    debug_methods: ['Chrome debugger', 'Sentry integration'],
    difficulty: 'intermediate',
    category: ['Error Handling', 'Async'],
    estimated_time: '20 min',
    problem_description: {
      expected: 'App should handle API errors gracefully and show error message to user',
      actual: 'App crashes with unhandled promise rejection when API call fails',
      context: 'Common when async operations fail without proper error handling'
    },
    hints: [
      'Check the async function - is there error handling?',
      'Look at the fetchData function around line 25. The await call has no try-catch block.',
      'Wrap the async operation in try-catch block and handle errors appropriately, or use .catch() on the promise.'
    ],
    solution_explanation: {
      why_wrong: 'Async functions that can fail don\'t have error handling, causing unhandled promise rejections.',
      why_caused_issue: 'When an async operation throws an error without being caught, it becomes an unhandled promise rejection, which can crash the app.',
      how_to_fix: 'Wrap async operations in try-catch blocks. Handle errors by showing user-friendly messages, logging errors, and using error boundaries for component-level errors.',
      best_practices: 'Always handle errors in async operations. Use try-catch for async/await. Use .catch() for promises. Implement error boundaries. Consider error tracking services like Sentry. Provide fallback UI for errors.'
    },
    learn_more: {
      docs: [
        'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary',
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch',
        'https://reactnative.dev/docs/error-handling'
      ],
      related_cases: [2, 8],
      external_resources: [
        'Error Handling Best Practices',
        'Sentry React Native'
      ]
    },
    test_steps: {
      buggy: [
        '1. Navigate to Case 5',
        '2. Trigger the API call (simulate network failure)',
        '3. App should crash with unhandled promise rejection',
        '4. Check console for error details'
      ],
      fixed: [
        '1. After fix, trigger API call with failure',
        '2. App should show error message instead of crashing',
        '3. User should be able to retry or continue using app'
      ]
    }
  },
  {
    id: 6,
    title: 'Keyboard Covering Input Fields',
    bug: 'Inputs hidden behind keyboard on focus',
    root_cause: 'Not using KeyboardAvoidingView / ScrollView properly',
    demonstrates: ['KeyboardAvoidingView', 'KeyboardAwareScrollView'],
    debug_methods: ['simulator testing', 'layout inspector'],
    difficulty: 'beginner',
    category: ['UI/UX', 'Keyboard'],
    estimated_time: '15 min',
    problem_description: {
      expected: 'When focusing an input, keyboard should appear and input should remain visible above it',
      actual: 'Keyboard covers the input field, making it impossible to see what you\'re typing',
      context: 'Common issue on mobile apps, especially on Android'
    },
    hints: [
      'Check the form layout - is there KeyboardAvoidingView?',
      'Look at the form component around line 10-20. The inputs are in a regular View without keyboard handling.',
      'Wrap the form in KeyboardAvoidingView with appropriate behavior prop, or use KeyboardAwareScrollView library.'
    ],
    solution_explanation: {
      why_wrong: 'Input fields are in a container that doesn\'t adjust when keyboard appears.',
      why_caused_issue: 'On mobile, when keyboard appears, it covers content. Without KeyboardAvoidingView, the layout doesn\'t adjust to keep inputs visible.',
      how_to_fix: 'Wrap form content in KeyboardAvoidingView with behavior="padding" (iOS) or "height" (Android), or use react-native-keyboard-aware-scroll-view library.',
      best_practices: 'Always use KeyboardAvoidingView for forms. Test on both iOS and Android as behavior differs. Consider KeyboardAwareScrollView for complex forms. Use keyboardVerticalOffset for tab bars/headers.'
    },
    learn_more: {
      docs: [
        'https://reactnative.dev/docs/keyboardavoidingview',
        'https://github.com/APSL/react-native-keyboard-aware-scroll-view',
        'https://reactnative.dev/docs/handling-touches#keyboard-avoiding-view'
      ],
      related_cases: [],
      external_resources: [
        'Keyboard Handling Guide',
        'React Native Keyboard Best Practices'
      ]
    },
    test_steps: {
      buggy: [
        '1. Navigate to Case 6',
        '2. Tap on an input field at the bottom of the screen',
        '3. Keyboard should cover the input',
        '4. Try to scroll - input remains hidden'
      ],
      fixed: [
        '1. After fix, tap on input field',
        '2. Keyboard should appear and input should move above it',
        '3. Test on both iOS and Android simulators'
      ]
    }
  },
  {
    id: 7,
    title: 'Android/iOS Platform-Specific Crash',
    bug: 'Works on iOS but crashes on Android (or vice versa)',
    root_cause: 'Platform-specific API used without Platform.OS checks',
    demonstrates: ['Platform.select', 'conditional imports'],
    debug_methods: ['Logcat', 'Xcode console'],
    difficulty: 'intermediate',
    category: ['Platform', 'Cross-Platform'],
    estimated_time: '20 min',
    problem_description: {
      expected: 'App should work consistently on both iOS and Android',
      actual: 'App works on one platform but crashes on the other',
      context: 'Common when using platform-specific APIs or features'
    },
    hints: [
      'Check for platform-specific code - are there Platform.OS checks?',
      'Look at the component around line 20-25. An iOS-specific API is used without checking the platform.',
      'Use Platform.OS to check platform, or use Platform.select() for platform-specific implementations.'
    ],
    solution_explanation: {
      why_wrong: 'Code uses platform-specific APIs or components without checking which platform it\'s running on.',
      why_caused_issue: 'iOS and Android have different APIs, components, and behaviors. Using one platform\'s API on another causes crashes.',
      how_to_fix: 'Use Platform.OS to conditionally use platform-specific code. Use Platform.select() for cleaner conditional logic. Consider platform-specific files (.ios.js, .android.js).',
      best_practices: 'Always test on both platforms. Use Platform.OS for runtime checks. Use Platform.select() for cleaner code. Consider platform-specific file extensions. Document platform differences.'
    },
    learn_more: {
      docs: [
        'https://reactnative.dev/docs/platform-specific-code',
        'https://reactnative.dev/docs/platform',
        'https://reactnative.dev/docs/platformcolor'
      ],
      related_cases: [],
      external_resources: [
        'Cross-Platform Development',
        'Platform-Specific Code Guide'
      ]
    },
    test_steps: {
      buggy: [
        '1. Test on iOS - should work fine',
        '2. Test on Android - should crash',
        '3. Check Logcat/Xcode console for platform-specific error'
      ],
      fixed: [
        '1. After fix, test on both platforms',
        '2. Both should work without crashes',
        '3. Verify platform-specific features work correctly'
      ]
    },
    platform_notes: {
      android: 'Check Logcat for detailed error messages',
      ios: 'Check Xcode console for crash logs'
    }
  },
  {
    id: 8,
    title: 'Image Not Loading (Network/Cache Issue)',
    bug: 'Remote images show broken / won\'t load',
    root_cause: 'CORS issues, http vs https, caching problems',
    demonstrates: ['Image props', 'FastImage', 'onError handling'],
    debug_methods: ['Network inspector', 'onError callbacks'],
    difficulty: 'beginner',
    category: ['Images', 'Network'],
    estimated_time: '15 min',
    problem_description: {
      expected: 'Remote images should load and display correctly',
      actual: 'Images show broken placeholder or don\'t load at all',
      context: 'Common with remote images, especially from external sources'
    },
    hints: [
      'Check the Image component - are there error handlers?',
      'Look at the Image component around line 15. Missing onError handler and possibly incorrect source format.',
      'Add onError handler, check image URL format, ensure HTTPS, add proper resizeMode, and consider using FastImage for better performance.'
    ],
    solution_explanation: {
      why_wrong: 'Image component lacks error handling, uses incorrect source format, or has network/CORS issues.',
      why_caused_issue: 'Network failures, CORS restrictions, HTTP vs HTTPS issues, or incorrect image URLs cause images to fail loading without proper error handling.',
      how_to_fix: 'Add onError and onLoad handlers. Ensure correct source format ({uri: url}). Use HTTPS. Handle loading states. Consider react-native-fast-image for better caching.',
      best_practices: 'Always handle image loading errors. Use HTTPS for remote images. Add loading placeholders. Use FastImage for better performance and caching. Test with slow networks. Handle CORS issues.'
    },
    learn_more: {
      docs: [
        'https://reactnative.dev/docs/image',
        'https://github.com/DylanVann/react-native-fast-image',
        'https://reactnative.dev/docs/images#network-images'
      ],
      related_cases: [2, 5],
      external_resources: [
        'Image Optimization Guide',
        'FastImage Documentation'
      ]
    },
    test_steps: {
      buggy: [
        '1. Navigate to Case 8',
        '2. Observe broken/missing images',
        '3. Check network tab - may show failed requests',
        '4. No error feedback to user'
      ],
      fixed: [
        '1. After fix, images should load correctly',
        '2. Show loading state while images load',
        '3. Show error message if image fails to load',
        '4. Test with slow network connection'
      ]
    }
  },
  {
    id: 9,
    title: 'Redux State Not Updating Component',
    bug: 'Redux state changes but component doesn\'t update',
    root_cause: 'Incorrect selector or misuse of useSelector dependencies',
    demonstrates: ['React-Redux hooks', 'selector optimization', 'reselect'],
    debug_methods: ['Redux DevTools', 'selector logging'],
    difficulty: 'advanced',
    category: ['State Management', 'Redux'],
    estimated_time: '25 min',
    problem_description: {
      expected: 'Component should update when Redux state changes',
      actual: 'Redux state updates (visible in DevTools) but component doesn\'t re-render',
      context: 'Common with Redux when selectors or hooks are misconfigured'
    },
    hints: [
      'Check the useSelector hook - is the selector correct?',
      'Look at the useSelector around line 20. The selector might be creating a new reference on each render.',
      'Ensure selector is stable (memoized), check if state shape matches, and verify Redux store is properly connected.'
    ],
    solution_explanation: {
      why_wrong: 'Selector function creates new references on each render, or state shape doesn\'t match what selector expects.',
      why_caused_issue: 'useSelector uses shallow equality. If selector returns a new object/array reference each time (even with same values), component won\'t update. Also, incorrect state paths cause issues.',
      how_to_fix: 'Memoize selectors with useMemo or use reselect library. Ensure selectors are stable references. Verify state structure matches selector expectations. Use Redux DevTools to inspect state.',
      best_practices: 'Use reselect for memoized selectors. Keep selectors pure and stable. Use TypeScript for type safety. Test selectors in isolation. Use Redux DevTools for debugging.'
    },
    learn_more: {
      docs: [
        'https://react-redux.js.org/api/hooks#useselector',
        'https://github.com/reduxjs/reselect',
        'https://redux.js.org/tutorials/fundamentals/part-5-ui-react'
      ],
      related_cases: [1, 11],
      external_resources: [
        'React-Redux Hooks Guide',
        'Reselect Documentation'
      ]
    },
    test_steps: {
      buggy: [
        '1. Navigate to Case 9',
        '2. Dispatch an action to update Redux state',
        '3. Check Redux DevTools - state should update',
        '4. Component should not re-render despite state change'
      ],
      fixed: [
        '1. After fix, dispatch action',
        '2. Component should re-render when state changes',
        '3. Verify with React DevTools Profiler'
      ]
    }
  },
  {
    id: 10,
    title: 'Navigation State Loss After Deep Link',
    bug: 'App navigation resets when opening deep link',
    root_cause: 'Improper linking configuration / state persistence missing',
    demonstrates: ['React Navigation deep linking', 'state persistence'],
    debug_methods: ['Navigation DevTools', 'linking config logs'],
    difficulty: 'advanced',
    category: ['Navigation', 'Deep Linking'],
    estimated_time: '30 min',
    problem_description: {
      expected: 'Deep link should navigate to specific screen while preserving navigation state',
      actual: 'Opening deep link resets navigation stack or navigates incorrectly',
      context: 'Common when deep linking is not properly configured'
    },
    hints: [
      'Check the linking configuration - is it properly set up?',
      'Look at the navigation configuration around line 30-40. The linking config might be missing or incorrect.',
      'Configure proper linking object in NavigationContainer, ensure screens are registered, and consider state persistence for better UX.'
    ],
    solution_explanation: {
      why_wrong: 'Deep linking configuration is missing, incorrect, or navigation state isn\'t properly initialized.',
      why_caused_issue: 'Without proper linking config, React Navigation doesn\'t know how to handle deep links. Missing state persistence causes navigation to reset.',
      how_to_fix: 'Configure linking object in NavigationContainer with proper screen mappings. Use getInitialURL and subscribe for URL changes. Consider state persistence for better UX.',
      best_practices: 'Always configure deep linking properly. Test deep links on both platforms. Use proper URL schemes. Consider universal links (iOS) and app links (Android). Document deep link structure.'
    },
    learn_more: {
      docs: [
        'https://reactnavigation.org/docs/deep-linking',
        'https://reactnavigation.org/docs/state-persistence',
        'https://reactnavigation.org/docs/navigation-container'
      ],
      related_cases: [],
      external_resources: [
        'Deep Linking Guide',
        'React Navigation State Persistence'
      ]
    },
    test_steps: {
      buggy: [
        '1. Set up deep link (e.g., myapp://case/5)',
        '2. Open deep link from external app/browser',
        '3. Navigation should reset or navigate incorrectly',
        '4. Check navigation state - should be lost'
      ],
      fixed: [
        '1. After fix, open deep link',
        '2. Should navigate to correct screen',
        '3. Navigation state should be preserved',
        '4. Test with various deep link formats'
      ]
    }
  },
  {
    id: 11,
    title: 'Infinite Loop in useEffect',
    bug: 'Component re-renders infinitely and app freezes',
    root_cause: 'Incorrect/missing dependency array in useEffect',
    demonstrates: ['useEffect dependencies', 'useCallback', 'useMemo'],
    debug_methods: ['React DevTools', 'render count logging'],
    difficulty: 'intermediate',
    category: ['React Hooks', 'Performance'],
    estimated_time: '20 min',
    problem_description: {
      expected: 'useEffect should run when dependencies change, not continuously',
      actual: 'Component re-renders in infinite loop, causing app to freeze',
      context: 'Common when dependencies are missing or incorrectly specified'
    },
    hints: [
      'Check the useEffect dependency array - what dependencies are listed?',
      'Look at the useEffect around line 15-20. The dependency array might be missing or include values that change on every render.',
      'Review dependencies carefully. Use useCallback/useMemo for functions/objects. Ensure dependencies are stable references.'
    ],
    solution_explanation: {
      why_wrong: 'useEffect has missing dependencies, or dependencies that change on every render (like objects/functions created inline).',
      why_caused_issue: 'When useEffect runs, it might update state. If that state is in dependencies (or missing), it triggers useEffect again, creating an infinite loop.',
      how_to_fix: 'Include all dependencies used in useEffect. Use useCallback for functions and useMemo for objects/arrays used as dependencies. Consider if effect should run on mount only (empty deps).',
      best_practices: 'Always include all dependencies. Use ESLint exhaustive-deps rule. Memoize functions/objects used as dependencies. Understand when to use empty dependency array. Use useCallback/useMemo appropriately.'
    },
    learn_more: {
      docs: [
        'https://react.dev/reference/react/useEffect',
        'https://react.dev/reference/react/useCallback',
        'https://react.dev/reference/react/useMemo',
        'https://react.dev/learn/escape-hatches'
      ],
      related_cases: [1, 3, 4],
      external_resources: [
        'useEffect Complete Guide',
        'React Hooks Best Practices'
      ]
    },
    test_steps: {
      buggy: [
        '1. Navigate to Case 11',
        '2. Component should start re-rendering infinitely',
        '3. App should freeze or become unresponsive',
        '4. Check console - should show continuous render logs'
      ],
      fixed: [
        '1. After fix, component should render normally',
        '2. useEffect should run only when dependencies change',
        '3. No infinite loop or freezing',
        '4. Verify with React DevTools Profiler'
      ]
    }
  },
  {
    id: 12,
    title: 'TextInput Auto-Capitalization Issues',
    bug: 'TextInput auto-capitalizes or autocorrects unexpectedly',
    root_cause: 'Incorrect TextInput props (autoCapitalize, autoCorrect, keyboardType)',
    demonstrates: ['TextInput props', 'device testing'],
    debug_methods: ['Props inspection', 'device testing'],
    difficulty: 'beginner',
    category: ['UI/UX', 'Forms'],
    estimated_time: '10 min',
    problem_description: {
      expected: 'TextInput should behave as configured (e.g., no auto-capitalization for email fields)',
      actual: 'TextInput auto-capitalizes or autocorrects when it shouldn\'t (e.g., email field)',
      context: 'Common when TextInput props are not set correctly for specific input types'
    },
    hints: [
      'Check the TextInput props - are autoCapitalize and autoCorrect set?',
      'Look at the TextInput component around line 25. Missing or incorrect autoCapitalize/autoCorrect props.',
      'Set autoCapitalize="none" for email/username fields, autoCorrect={false} when needed, and use appropriate keyboardType.'
    ],
    solution_explanation: {
      why_wrong: 'TextInput props not configured correctly for the input type (e.g., email field with auto-capitalization enabled).',
      why_caused_issue: 'Default TextInput behavior includes auto-capitalization and autocorrect, which is inappropriate for fields like email, username, or passwords.',
      how_to_fix: 'Set autoCapitalize="none" for email/username fields. Set autoCorrect={false} when autocorrect is unwanted. Use keyboardType="email-address" for email fields. Test on actual devices.',
      best_practices: 'Always configure TextInput props appropriately for input type. Test on real devices (simulator behavior can differ). Use keyboardType for better UX. Consider secureTextEntry for passwords.'
    },
    learn_more: {
      docs: [
        'https://reactnative.dev/docs/textinput',
        'https://reactnative.dev/docs/textinput#autocapitalize',
        'https://reactnative.dev/docs/textinput#keyboardtype'
      ],
      related_cases: [6],
      external_resources: [
        'TextInput API Reference',
        'Form Best Practices'
      ]
    },
    test_steps: {
      buggy: [
        '1. Navigate to Case 12',
        '2. Focus on email input field',
        '3. Start typing - should auto-capitalize first letter',
        '4. Autocorrect may suggest incorrect corrections'
      ],
      fixed: [
        '1. After fix, focus on email input',
        '2. No auto-capitalization should occur',
        '3. Autocorrect should be disabled',
        '4. Keyboard should show email-optimized layout'
      ]
    }
  }
];

