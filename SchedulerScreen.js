import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';  
import { getCourseNumber, getCourseTerm, hasConflict, terms } from './components/courseUtils';
import UserContext from './components/UserContext';
import CourseEditScreen from './components/CourseEditScreen';

// data for scheduling
const schedule = {
  "title": "CS Courses for 2018-2019",
  "error": "There's some error!"
};


const SchedulerScreen = ({navigation}) => {
  const [schedule, setSchedule] = useState({ title: '', courses: [] });     // state variable for schedule
  const user = useContext(UserContext);
  const canEdit = user && user.role === 'admin';
  
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';  // url for retrieving course data

  const view = (course) => {
    navigation.navigate(canEdit ? 'CourseEditScreen' : 'CourseDetailScreen', { course });
  };

  useEffect(() => {                           // async & await for fetching data from url
    const fetchSchedule =  async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(json);
    }
    fetchSchedule();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <Banner title={schedule.title} error={schedule.error} />
      <CourseList courses={schedule.courses} view={view} />
    </SafeAreaView>
  );
};


const Banner = ({title}) => (
  <Text style={styles.bannerStyle}>{title || '[loading...]'}</Text>
);

const view = (course) => {
  navigation.navigate('CourseDetailScreen', { course });
};


// Getting course
const CourseList = ({courses, view}) => {
  const [selectedTerm, setSelectedTerm] = useState('Fall');

  const termCourses = courses.filter(course => selectedTerm === getCourseTerm(course));
  
  return (
    <View>
      <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
      <CourseSelector courses={termCourses} view={view} />
    </View>
  );
};


const Course = ({course, disabled, isActive, select, view}) => (
  <TouchableOpacity style={styles[disabled ? 'courseButtonDisabled' : isActive ? 'courseButtonActive' : 'courseButton']}
      onPress={() => { if (!disabled) select(course); }}
      onLongPress={() => view(course)}>
    <Text style={styles.courseText}>
      {`CS ${getCourseNumber(course)}\n${course.meets}`}
    </Text>
  </TouchableOpacity>
);

const CourseSelector = ({courses, view}) => {
  const [selected, setSelected] = useState([]);

  const toggle = course => setSelected(selected => (
    selected.includes(course) ? selected.filter(x => x !== course) : [...selected, course]
  ));

  return (
    <ScrollView>
      <View style={styles.courseList}>
        { 
          courses.map(course => (
            <Course key={course.id} course={course} 
              select={toggle}
              disabled={hasConflict(course, selected)}
              isActive={selected.includes(course)}
              view={view}
            />
          ))
        }
      </View>
    </ScrollView>
  );
};

// Getting term

const TermButton = ({term, setSelectedTerm, isActive}) => (
  <TouchableOpacity style={styles[isActive ? 'termButtonActive' : 'termButton']} 
      onPress={() => setSelectedTerm(term)}>
    <Text style={styles.termText}>{term}</Text>
  </TouchableOpacity>
);

const TermSelector = ({selectedTerm, setSelectedTerm}) => (
  <View style={styles.termSelector}>
    { 
      terms.map(term => (
        <TermButton key={term} term={term} setSelectedTerm={setSelectedTerm}
        isActive={term === selectedTerm}
        />
      ))
    }
  </View>
);


// STYLING

const termButtonBase = {
  flex: 1,
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 10,
  height: 40,
  padding: 10,
  minWidth: 90,
  maxWidth: 90,
};


const courseButtonBase = {
  flex: 1,
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 10,
  height: 60,
  padding: 10,
  minWidth: 90,
  maxWidth: 90,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  bannerStyle: {
    color: '#888',
    fontSize: 32,
  },
  courseList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  courseButton: {
    ...courseButtonBase,
    backgroundColor: '#66b0ff',
  },
  courseButtonActive: {
    ...courseButtonBase,
    backgroundColor: '#004a99',
  },
  courseButtonDisabled: {
    ...courseButtonBase,
    backgroundColor: '#d3d3d3',
  },
  courseText:{
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  termSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350,
  },
  termButton: {
    ...termButtonBase,
    backgroundColor: '#4f9f64'
  },
  termButtonActive: {
    ...termButtonBase,
    backgroundColor: '#105f25',
  },
  termText: {
    color: '#fff',
    fontSize: 15,
  }
});



export default SchedulerScreen;