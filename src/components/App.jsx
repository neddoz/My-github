import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';

class App extends Component{
        constructor(props){
            super(props);
            this.state = {
                username: 'neddoz',
                userData: [],
                userRepos: [],
                perPage: 5
            }
        }

        //Get user data from github
        getUserData(){
            $.ajax({
                url:'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
                dataType:'json',
                cache:false,
                success: function(data){
                    this.setState({userData: data});
                    console.log(data);
                }.bind(this),
                error: function(xhr, status, err){
                    this.setState({username: null})
                    alert(err)
                }.bind(this)
            });
        }

        //Get user repos from github
        getUserRepos(){
            $.ajax({
                url:'https://api.github.com/users/' + this.state.username + '/repos?per_page' + this.state.perPage + '&client_id=' + this.props.clientId + '&client_secret=' + this.props.clientSecret + '&sort=created',
                dataType:'json',
                cache:false,
                success: function(data){
                    this.setState({userRepos: data});
                    console.log(data);
                }.bind(this),
                error: function(xhr, status, err){
                    this.setState({username: null})
                    alert(err)
                }.bind(this)
            });
        }

        handleFormSubmition(username){
            this.setState({username: username}, function(){
                this.getUserData();
                this.getUserRepos();
            });
        }

        componentDidMount(){
            this.getUserData();
            this.getUserRepos();
        }

        render(){
            return (<div>
                        <Search onFormSubmit = {this.handleFormSubmition.bind(this)}/>
                        <Profile {...this.state}/>
                    </div>)
        }
        }

App.propTypes = {
    clientId: React.PropTypes.string,
    clientSecret: React.PropTypes.string
};
App.defaultProps = {
    clientId: '4520524a071a8229832b',
    clientSecret: '6971a461fdfef3f3d45f1b941bfdef700adabb61'
};


export default App
