const React = require("react")
const ReactDOM = require("react-dom")
const ReactTestUtils = require("react-dom/test-utils")

// React cheat sheet https://gist.github.com/moonmaster9000/941b619d6b25cc740aad5f7e926a5150

class PlayForm extends React.Component {
    constructor(){
        super()
        this.state = {message: "", player1: "", player2: ""};
        this. handleChangePlayer1= this. handleChangePlayer1.bind(this);
        this. handleChangePlayer2= this. handleChangePlayer2.bind(this);
    }

    handleChangePlayer1(event) {
        this.setState({player1: event.target.value});

    }

    handleChangePlayer2(event) {
        this.setState({player2: event.target.value});
    }
    handlePlay(){
        this.props.requests.playRound(this.state.player1, this.state.player2, this)
    }

    tie(){
        this.setState({message: "Tie"})
    }

    invalid(){
        this.setState({message: "Invalid"})
    }

    p1_wins(){
        this.setState({message: "Player 1 wins!"})
    }

    p2_wins(){
        this.setState({message: "Player 2 wins!"})
    }

    render(){
        return (
            <div>
                <div>{this.state.message}</div>
                {/*<input type="text" name="p1Throw" onChange={(event) => {this.state.player1 = event.target.value}}/>*/}
                {/*<input type="text" name="p2Throw" onChange={(event) => {this.state.player2 = event.target.value}}/>*/}
                {<input type="text" name="p1Throw" onChange={this.handleChangePlayer1}/>}
                {<input type="text" name="p2Throw" onChange={this.handleChangePlayer2}/>}
                <button onClick={this.handlePlay.bind(this)}>Submit</button>
            </div>
        )
    }
}

describe("PlayForm", function () {
    beforeEach(function(){
        setupDOM()
    })

    afterEach(function(){
        cleanUpDOM();
    })

    fdescribe("when receives the input", function () {
        it("passes the correct input to the rps module", function () {
            let playRoundSpy = jasmine.createSpy()
            let requests = {
                playRound: playRoundSpy
            }

            renderPlayForm(requests);

            // fill rock
            let input1 = domFixture.querySelector("[name='p1Throw']")
            input1.value = "rock"
            ReactTestUtils.Simulate.change(input1)

            // fill in sailboat
            let input2 = domFixture.querySelector("[name='p2Throw']")
            input2.value = "sailboat"
            ReactTestUtils.Simulate.change(input2)




            // click button
            submitForm();

            // check that spy got the right stuff
            expect(playRoundSpy).toHaveBeenCalledWith("rock", "sailboat", jasmine.any(Object))
        });

    });

    describe("when the rps module determines that the input is invalid", function () {
        it('displays Invalid', function () {
            let requests = {
                playRound: function(p1Throw, p2Throw, ui) {ui.invalid()}
            }

            renderPlayForm(requests);

            expect(page()).not.toContain("Invalid")
            submitForm();
            expect(page()).toContain("Invalid")
        });
    });

    describe("when the rps module determines a tie", function () {
        it('displays Tie', function () {
            let requests = {
                playRound: function(p1Throw, p2Throw, ui) {ui.tie()}
            }

            renderPlayForm(requests)

            expect(page()).not.toContain("Tie")
            submitForm()
            expect(page()).toContain("Tie")
        });
    });

    describe("when the rps module determines that player 1 wins", function () {
        it('displays Player 1 Wins', function () {
            let requests = {
                playRound: function (p1Throw, p2Throw, ui) {
                    ui.p1_wins()
                }
            }

            renderPlayForm(requests)

            expect(page()).not.toContain("Player 1")
            submitForm()
            expect(page()).toContain("Player 1 wins!")
        });
    });

    describe("when the rps module determines that player 2 wins", function () {
        it('displays Player 2 Wins', function () {
            let requests = {
                playRound: function(p1Throw, p2Throw, ui) {ui.p2_wins()}
            }

            renderPlayForm(requests)

            expect(page()).not.toContain("Player 2")
            submitForm()
            expect(page()).toContain("Player 2 wins!")
        });
    });

    let domFixture;

    function setupDOM() {
        domFixture = document.createElement("div")
        domFixture.id = "hello"
        document.body.appendChild(domFixture)
    }

    function cleanUpDOM(){
        domFixture.remove()
    }

    function renderPlayForm(requests) {
        ReactDOM.render(<PlayForm requests={requests}></PlayForm>, domFixture)
    }

    function page() {
        return domFixture.innerText;
    }

    function submitForm() {
        document.querySelector("button").click()
    }
})

















