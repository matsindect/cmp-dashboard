import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

export default function SocialForm(props){
    const {form, handleChange} = props;
    return(
        <div>
            <TextField
                className="mt-8 mb-16 mx-4"
                label="twitter"
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton>
                                <TwitterIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                id="twitter"
                name="twitter"
                value={form.twitter}
                onChange={handleChange}
                variant="outlined"
                fullWidth
            />
            <TextField
                className="mt-8 mb-16 mx-4"
                label="facebook"
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton>
                                <FacebookIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                id="facebook"
                name="facebook"
                value={form.facebook}
                onChange={handleChange}
                variant="outlined"
                fullWidth
            />
            <TextField
                className="mt-8 mb-16 mx-4"
                label="instagram"
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton>
                                <InstagramIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                id="instagram"
                name="instagram"
                value={form.instagram}
                onChange={handleChange}
                variant="outlined"
                fullWidth
            />
            <TextField
                className="mt-8 mb-16 mx-4"
                label="linkedin"
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton>
                                <LinkedInIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                id="lnkedin"
                name="lnkedin"
                value={form.lnkedin}
                onChange={handleChange}
                variant="outlined"
                fullWidth
            />
            <TextField
                className="mt-8 mb-16 mx-4"
                label="youtube"
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton>
                                <YouTubeIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                id="youtube"
                name="youtube"
                value={form.youtube}
                onChange={handleChange}
                variant="outlined"
                fullWidth
            />
        </div>
    )

}