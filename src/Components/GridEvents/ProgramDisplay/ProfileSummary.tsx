import React from 'react';
import { Link } from 'react-router-dom';
import { ProfileInterface } from '../../DataTypes/Profile';

interface ProfileSummaryProps {
    profile: ProfileInterface;
}

const ProfileSummary: React.FC<ProfileSummaryProps> = (props: ProfileSummaryProps) => {
    const { profile } = props;

    return (
        <div className="profile-summary">
            <div className="row">
                <div className="col-sm-6 col-lg-3">
                    <a
                        href={profile?.link}
                        target="_blank"
                        rel="noreferrer"
                        title={profile?.title + ' - Profile'}>
                        <div className="avatar-wrapper">
                            <img
                                src={profile?.avatar}
                                alt={profile?.title}
                                className="img-fluid rounded-circle"
                            />
                        </div>
                    </a>
                </div>
                <div className="col-sm-6 col-lg-9">
                    <h5>
                        <a
                            href={profile?.link}
                            title={profile?.title + ' - Profile'}
                            target="_blank"
                            rel="noreferrer">
                            {profile?.title}
                        </a>
                    </h5>
                    <h6>{profile?.job}</h6>
                </div>
            </div>
        </div>
    );
};

export default ProfileSummary;
