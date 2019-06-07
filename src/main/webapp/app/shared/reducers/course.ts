import axios from 'axios';

import { SUCCESS } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  GET_COURSES: 'course/GET_COURSES',
  CLEAR_COURSES: 'course/CLEAR_COURSES',
  ADD_COURSE: 'course/ADD_COURSE',
  DELETE_COURSE: 'course/DELETE_COURSE',
  UPDATE_COURSE: 'course/UPDATE_COURSE'
};

const initialState = {
  courses: []
};

export type ApplicationCourseState = Readonly<typeof initialState>;

export default (state: ApplicationCourseState = initialState, action): ApplicationCourseState => {
  switch (action.type) {
    case SUCCESS(ACTION_TYPES.GET_COURSES):
      return {
        ...state,
        courses: action.payload.data
      };
    case ACTION_TYPES.CLEAR_COURSES:
      let newState = { ...state };
      delete newState.courses;
      return {
        ...newState
      };
    case ACTION_TYPES.ADD_COURSE:
      return {
        ...state,
        courses: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COURSE):
      return {
        ...state
      };
    case SUCCESS(ACTION_TYPES.UPDATE_COURSE):
      return {
        ...state
      };
    default:
      return state;
  }
};

export const getCourses = () => dispatch =>
  dispatch({
    type: ACTION_TYPES.GET_COURSES,
    payload: axios.get('api/course/findAllCourses')
  });

export const clearCourses = () => dispatch =>
  dispatch({
    type: ACTION_TYPES.CLEAR_COURSES
  });

export const addCourse = ({ courseName, courseLocation, courseContent, teacherId }) => dispatch =>
  dispatch({
    type: ACTION_TYPES.ADD_COURSE,
    payload: axios.post('api/course/addCourse', { courseName, courseLocation, courseContent, teacherId })
  });

export const deleteCourses = courseName => dispatch =>
  dispatch({
    type: ACTION_TYPES.DELETE_COURSE,
    payload: axios.delete('api/course/deleteCourse/' + courseName)
  });

export const updateCourse = ({ courseName, courseLocation, courseContent, teacherId }) => dispatch =>
  dispatch({
    type: ACTION_TYPES.UPDATE_COURSE,
    payload: axios.put('api/course/updateCourse', { courseName, courseLocation, courseContent, teacherId })
  });
