import React, { Component } from 'react';

class Menu extends Component {
    render() {
        return (
            <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                    <li className="dropdown notifications-menu">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            <i className="mdi mdi-bell"></i>
                        </a>
                        <ul className="dropdown-menu scale-up">
                            <li className="header">You have 7 notifications</li>
                            <li>
                                <ul className="menu inner-content-div">
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-users text-aqua"></i> Curabitur id eros quis nunc
                                            suscipit blandit.
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-warning text-yellow"></i> Duis malesuada justo eu sapien
                                            elementum, in semper diam posuere.
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-users text-red"></i> Donec at nisi sit amet tortor
                                            commodo porttitor pretium a erat.
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-shopping-cart text-green"></i> In gravida mauris et nisi
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-user text-red"></i> Praesent eu lacus in libero dictum
                                            fermentum.
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-user text-red"></i> Nunc fringilla lorem
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-user text-red"></i> Nullam euismod dolor ut quam
                                            interdum, at scelerisque ipsum imperdiet.
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="footer"><a href="#">View all</a></li>
                        </ul>
                    </li>
                    <li className="dropdown tasks-menu">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            <i className="mdi mdi-help"></i>
                        </a>
                        <ul className="dropdown-menu scale-up">
                            <li className="header">You have 6 tasks</li>
                            <li>
                                <ul className="menu inner-content-div">
                                    <li>
                                        <a href="#">
                                            <h3>
                                                Lorem ipsum dolor sit amet
                                                <small className="pull-right">30%</small>
                                            </h3>
                                            <div className="progress xs">
                                                <div className="progress-bar progress-bar-aqua" style="width: 30%"
                                                     role="progressbar"
                                                     aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                    <span className="sr-only">30% Complete</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <h3>
                                                Vestibulum nec ligula
                                                <small className="pull-right">20%</small>
                                            </h3>
                                            <div className="progress xs">
                                                <div className="progress-bar progress-bar-danger" style="width: 20%"
                                                     role="progressbar"
                                                     aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                    <span className="sr-only">20% Complete</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <h3>
                                                Donec id leo ut ipsum
                                                <small className="pull-right">70%</small>
                                            </h3>
                                            <div className="progress xs">
                                                <div className="progress-bar progress-bar-light-blue" style="width: 70%"
                                                     role="progressbar"
                                                     aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                    <span className="sr-only">70% Complete</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <h3>
                                                Praesent vitae tellus
                                                <small className="pull-right">40%</small>
                                            </h3>
                                            <div className="progress xs">
                                                <div className="progress-bar progress-bar-yellow" style="width: 40%"
                                                     role="progressbar"
                                                     aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                    <span className="sr-only">40% Complete</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <h3>
                                                Nam varius sapien
                                                <small className="pull-right">80%</small>
                                            </h3>
                                            <div className="progress xs">
                                                <div className="progress-bar progress-bar-red" style="width: 80%"
                                                     role="progressbar"
                                                     aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                    <span className="sr-only">80% Complete</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <h3>
                                                Nunc fringilla
                                                <small className="pull-right">90%</small>
                                            </h3>
                                            <div className="progress xs">
                                                <div className="progress-bar progress-bar-primary" style="width: 90%"
                                                     role="progressbar"
                                                     aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                    <span className="sr-only">90% Complete</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="footer">
                                <a href="#">View all tasks</a>
                            </li>
                        </ul>
                    </li>

                    <li className="dropdown user user-menu">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            <img src="../images/user-info.jpg" className="user-image rounded-circle" alt="User Image"></img>
                        </a>
                        <ul className="dropdown-menu scale-up">
                            <li className="user-header">
                                <img src="../images/user5-128x128.jpg" className="float-left rounded-circle"
                                     alt="User Image"></img>


                                <p>
                                    Romi Roy
                                    <small className="mb-5">jb@gmail.com</small>
                                    <a href="#" className="btn btn-danger btn-sm btn-rounded">View Profile</a>
                                </p>
                            </li>
                            <li className="user-body">
                                <div className="row no-gutters">
                                    <div className="col-12 text-left">
                                        <a href="#"><i className="ion ion-person"></i> My Profile</a>
                                    </div>
                                    <div role="separator" className="divider col-12"></div>
                                    <div className="col-12 text-left">
                                        <a href="#"><i className="ti-settings"></i> Account Setting</a>
                                    </div>
                                    <div role="separator" className="divider col-12"></div>
                                    <div className="col-12 text-left">
                                        <a href="#"><i className="fa fa-power-off"></i> Logout</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <button className="btn btn-social-icon btn-circle btn-google hide" data-toggle="modal"
                                data-target="#login"><i className="fa fa-google-plus"></i></button>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Menu;
