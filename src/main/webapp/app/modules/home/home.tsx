import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { clearCourses, getCourses, addCourse, deleteCourses, updateCourse } from 'app/shared/reducers/course';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  constructor(props) {
    super(props);
    this.state = {
      courseName: '',
      courseLocation: '',
      courseContent: '',
      teacherId: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  handleSubmit(event) {
    alert('A course is added: ' + this.state.courseName);
    this.props.addCourse({
      courseName: this.state.courseName,
      courseLocation: this.state.courseLocation,
      courseContent: this.state.courseContent,
      teacherId: this.state.teacherId
    });
    event.preventDefault();
  }
  handleUpdate(event) {
    this.props.updateCourse({
      courseName: this.state.courseName,
      courseLocation: this.state.courseLocation,
      courseContent: this.state.courseContent,
      teacherId: this.state.teacherId
    });
    event.preventDefault();
  }
  componentDidMount() {
    this.props.getSession();
  }

  getAllCourses = () => {
    this.props.getCourses();
  };

  clearAllCourses = () => {
    this.props.clearCourses();
  };

  deleteCourse = event => {
    alert('Delete course: ' + event.target.value);
    this.props.deleteCourses(event.target.value);
  };

  render() {
    let { account, courses, showCourse } = this.props;

    console.log(showCourse);
    return (
      <Row>
        <Col md="9">
          <h2>Welcome, 全栈ReactSpring项目!</h2>
          <p className="lead">This is your homepage</p>
          {account && account.login ? (
            <div>
              <Alert color="success">You are logged in as user {account.login}.</Alert>
              <button className="btn btn-primary" onClick={this.getAllCourses}>
                显示所有课程
              </button>{' '}
              <button onClick={this.clearAllCourses} className="btn btn-primary">
                清除
              </button>
              {courses &&
                courses.map(course => (
                  <div className="courseOutterTable">
                    <div className="courseInnerTable">{course.courseName}</div>
                    <div>{course.courseLocation}</div>
                    <div>{course.courseContent}</div>
                    <div>{course.teacherName}</div>
                    <button>注册课程</button>
                    <button>修改课程</button>
                    <button onClick={this.deleteCourse} value={course.courseName}>
                      删除课程
                    </button>
                  </div>
                ))}
              <hr />
              <p className="lead">Add a course: </p>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Course Name:
                  <input type="text" name="courseName" value={this.state.courseName} onChange={this.handleChange} />
                </label>
                <label>
                  Location:
                  <input type="text" name="courseLocation" value={this.state.courseLocation} onChange={this.handleChange} />
                </label>
                <label>
                  Content:
                  <input type="text" name="courseContent" value={this.state.courseContent} onChange={this.handleChange} />
                </label>
                <label>
                  Teacher:
                  <input type="text" name="teacherId" value={this.state.teacherId} onChange={this.handleChange} />
                </label>
                <input className="btn btn-primary" type="submit" value="Submit" />
              </form>
              <hr />
              <p className="lead">Update a course: </p>
              <form onSubmit={this.handleUpdate}>
                <label>
                  Course Name:
                  <input type="text" name="courseName" value={this.state.courseName} onChange={this.handleChange} />
                </label>
                <label>
                  Location:
                  <input type="text" name="courseLocation" value={this.state.courseLocation} onChange={this.handleChange} />
                </label>
                <label>
                  Content:
                  <input type="text" name="courseContent" value={this.state.courseContent} onChange={this.handleChange} />
                </label>
                <label>
                  Teacher:
                  <input type="text" name="teacherId" value={this.state.teacherId} onChange={this.handleChange} />
                </label>
                <input className="btn btn-primary" type="submit" value="Submit" />
              </form>
            </div>
          ) : (
            <div>
              <Alert color="warning">
                If you want to
                <Link to="/login" className="alert-link">
                  {' '}
                  sign in
                </Link>
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
              </Alert>

              <Alert color="warning">
                You do not have an account yet?&nbsp;
                <Link to="/register" className="alert-link">
                  Register a new account
                </Link>
              </Alert>
            </div>
          )}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  courses: storeState.course.courses,
  showCourse: storeState.course.showCourse
});

const mapDispatchToProps = { getSession, getCourses, clearCourses, addCourse, deleteCourses, updateCourse };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
//type IHomeState = { newCourseName: string, newContent: string, newLocation: string, newTeacher: string};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
