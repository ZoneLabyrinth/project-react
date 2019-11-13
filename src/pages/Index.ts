import React from 'react';
import {
    BrowserRouter as Router, Link, Route, Switch,
} from 'react-router-dom';
import Api from 'api/api';
import { Button } from 'antd-mobile';
import routers from '../router/index';
import { bg } from '../assets/images/photo.jpeg';


class App extends React.Component {
    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const result = await Api.getUser();
    }


    render() {
        return (
            <Router>
                <div>
                    <Button type="primary" size="small" inline>small</Button>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/users">Users</Link>
                            </li>
                            <li>
                                <img alt="" src={bg} />
                            </li>
                        </ul>
                    </nav>
                    <Switch>

                        {
                            routers.map((router, index) => (
                                <Route
                                    path={router.path}
                                    key={index}
                                    exact={router.exact}
                                    component={router.component}
                                />
                            ))
                        }
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
