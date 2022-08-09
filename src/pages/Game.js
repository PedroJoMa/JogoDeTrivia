import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../styles/Game.css';
import { addScore } from '../redux/actions';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      questionIndex: 0,
      loading: true,
      timer: 30,
      disabled: true,
      responses: [],
    };
    this.count = 5;
  }

  componentDidMount() {
    this.requestQuestion();
    this.timeToThink();
  }

  timeToThink = () => {
    const ONE_SECOND = 1000;
    this.thinkTime = setInterval(() => {
      if (this.count === 0) {
        clearInterval(this.thinkTime);
        this.setState({ disabled: false });
        this.handleTimer();
      }

      this.count -= 1;
    }, ONE_SECOND);
  }

  handleTimer = () => {
    const ONE_SECOND = 1000;
    this.answerTime = setInterval(
      () => this.setState((prevState) => ({ timer: prevState.timer - 1 }),
        this.handleEnableButton), ONE_SECOND,
    );
  };

  handleEnableButton = () => {
    const THIRTY_SECONDS = 30;
    const { timer } = this.state;
    if (timer === THIRTY_SECONDS) {
      this.setState({ disabled: false });
    }
    if (timer === 0) {
      this.setState((prevState) => {
        const PENULTIMATE_QUESTION = 3;
        if (prevState.questionIndex <= PENULTIMATE_QUESTION) {
          clearInterval(this.answerTime);
          return {
            disabled: true,
            // questionIndex: prevState.questionIndex + 1,
            // timer: 35,
          };
        }
      });
    }
  }

  setRandomOrderAnswers = () => {
    const RANDOM_HELPER = 0.5;
    const { questions, questionIndex } = this.state;
    const currQuestion = questions[questionIndex];
    const response = [
      {
        answer: currQuestion.correct_answer,
        test: 'correct-answer',
        color: 'correctAnswer',
      },
      ...currQuestion.incorrect_answers
        .map((incAnswer, index) => ({
          answer: incAnswer,
          test: `wrong-answer-${index}`,
          color: 'wrongAnswer',
        })),
    ];

    this.setState({ responses: response.sort(() => Math.random() - RANDOM_HELPER) });
  };

  requestQuestion = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const ApiQuestion = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(ApiQuestion);
    const data = await response.json();
    const { results } = data;

    if (results.length === 0) {
      localStorage.clear();
      history.push('/');
    }

    this.setState({ questions: results, loading: false },
      this.setRandomOrderAnswers);
  }

  setScore = (difficulty, answer) => {
    const { timer } = this.state;
    const { dispatchScore } = this.props;
    // console.log(difficulty);
    // console.log(answer);
    if (answer === 'correct-answer') {
      let score = 0;
      const TEN_POINTS = 10;
      const THREE_POINTS = 3;
      switch (difficulty) {
      case 'easy':
        score = TEN_POINTS + (timer * 1);
        break;
      case 'medium':
        score = TEN_POINTS + (timer * 2);
        break;
      case 'hard':
        score = TEN_POINTS + (timer * THREE_POINTS);
        break;
      default:
        score = 0;
      }
      // console.log(score);
      dispatchScore(score);
    }
  }

  render() {
    const { questions, questionIndex, loading, disabled, timer, responses } = this.state;
    const currQuestion = questions[questionIndex];

    return loading ? (<div> Loading...</div>) : (
      <div>
        <Header />
        <main>
          <p data-testid="question-category">{currQuestion.category}</p>
          <p>{timer}</p>
          <p data-testid="question-text">
            {currQuestion.question}
          </p>
          <div data-testid="answer-options">
            {responses.map(({ answer, test, color }) => (
              <button
                className={ color }
                key={ answer }
                type="button"
                data-testid={ test }
                disabled={ disabled }
                onClick={ () => this.setScore(currQuestion.difficulty, test) }
              >
                {answer}
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (payload) => dispatch(addScore(payload)),
});

Game.propTypes = {
  history: PropTypes.object,
  dispatchScore: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Game);
