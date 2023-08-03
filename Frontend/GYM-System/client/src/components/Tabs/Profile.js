import React, { useEffect, useState } from "react";
import {
  AddButton,
  ButtonContainer,
  Container,
  Data,
  DataItem,
  DataTitle,
  ErrorMessage,
  FormContainer,
  LogoutButton,
  LogoutWrapper,
  ProfileContent,
} from "./style";
import {
  CheckBoxes,
  CustomDatePicker,
  CustomForm,
  CustomSelect,
  FormItem,
  InputFelid,
  Label,
} from "./style";
import { Col, Row } from "antd";
import dayjs from "dayjs";
import { RegisterButton } from "../Registration/style";
import {
  getMemberByID,
  getTrainerByID,
  updateUser,
} from "../../actions/AuthActions";
import {
  validationSchemaTrainerEdit,
  validationSchemaUserProfile,
} from "../utils/validations";
import { userRoles } from "../../resources/UserRoles";

const preferenceOptions = [
  { label: "Weight Loss", value: "Weight Loss" },
  { label: "Muscle Building", value: "Muscle Building" },
  { label: "Athletic Performance", value: "Athletic Performance" },
];

const Profile = ({ forceRender }) => {
  const user = JSON.parse(sessionStorage.getItem("profile"));
  const [profile, setProfile] = useState(null);
  const [errors, setErrors] = useState({});
  const [validationMode, setValidationMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleEdit = () => {
    setProfile({
      ...profile,
      dob: dayjs(profile.dob),
      weight: profile.weight + "kg",
      height: profile.height + "cm",
    });
    setEditMode(true);
  };
  const fetchData = async () => {
    if (user?.userRole === userRoles.MEMBER) {
      const data = await getMemberByID(user?.userID);
      data.purpose = data.purpose.split(",");
      setProfile(data);
    } else if (user?.userRole === userRoles.INSTRUCTOR) {
      setProfile(await getTrainerByID(user?.userID));
    }
  };
  useEffect(() => {
    fetchData();
  }, [forceRender]);

  const handleUpdate = () => {
    setValidationMode(true);
    if (errors === null) {
      updateUser(profile);
      setEditMode(false);
      const user = profile;
      if (profile?.userRole === userRoles.MEMBER)
        user.purpose = user.purpose.split(",");
      sessionStorage.setItem("profile", JSON.stringify(user));
    }
  };

  const handleOnChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };
  const handleOnChangeDatePicker = (date) => {
    setProfile({ ...profile, dob: date });
  };

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    if (validationMode) {
      if (profile?.userRole === userRoles.INSTRUCTOR) {
        validationSchemaTrainerEdit
          .validate(profile, { abortEarly: false })
          .then(() => {
            setErrors(null);
          })
          .catch((validationErrors) => {
            const newErrors = {};
            validationErrors.inner.forEach((error) => {
              newErrors[error.path] = error.message;
            });
            setErrors(newErrors);
          });
      } else {
        validationSchemaUserProfile
          .validate(profile, { abortEarly: false })
          .then(() => {
            setErrors(null);
          })
          .catch((validationErrors) => {
            const newErrors = {};
            validationErrors.inner.forEach((error) => {
              newErrors[error.path] = error.message;
            });
            setErrors(newErrors);
          });
      }
    }
  }, [profile, validationMode]);

  return (
    <Container>
      <ButtonContainer
        style={{ justifyContent: editMode ? "flex-start" : "flex-end" }}
      >
        {editMode ? (
          <AddButton onClick={() => setEditMode(false)}>Back</AddButton>
        ) : (
          <AddButton onClick={handleEdit}>Edit</AddButton>
        )}
      </ButtonContainer>
      {!editMode ? (
        <ProfileContent>
          <Row gutter={16} style={{ marginTop: "50px" }}>
            <Col sm={24} md={8} lg={6}>
              <DataItem>
                <DataTitle>ID : </DataTitle>
                <Data>{profile?.userID}</Data>
              </DataItem>
            </Col>
            <Col sm={24} md={8} lg={6}>
              <DataItem>
                <DataTitle>Full Name : </DataTitle>
                <Data>{profile?.fullName}</Data>
              </DataItem>
            </Col>
            <Col sm={24} md={8} lg={6}>
              <DataItem>
                <DataTitle>Email : </DataTitle>
                <Data>{profile?.email}</Data>
              </DataItem>
            </Col>
            <Col sm={24} md={8} lg={6}>
              <DataItem>
                <DataTitle>NIC : </DataTitle>
                <Data>{profile?.nic}</Data>
              </DataItem>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "50px" }}>
            <Col sm={24} md={8} lg={6}>
              <DataItem>
                <DataTitle>Birthday : </DataTitle>
                <Data>{new Date(profile?.dob).toDateString()}</Data>
              </DataItem>
            </Col>
            <Col sm={24} md={8} lg={6}>
              <DataItem>
                <DataTitle>Gender : </DataTitle>
                <Data>{profile?.gender}</Data>
              </DataItem>
            </Col>
            <Col sm={24} md={8} lg={6}>
              <DataItem>
                <DataTitle>Mobile : </DataTitle>
                <Data>{profile?.mobile}</Data>
              </DataItem>
            </Col>
            <Col sm={24} md={8} lg={6}>
              <DataItem>
                <DataTitle>Branch : </DataTitle>
                <Data>{profile?.branch}</Data>
              </DataItem>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "50px" }}>
            {profile?.userRole === userRoles.INSTRUCTOR ? (
              <Col sm={24} md={8} lg={6}>
                <DataItem>
                  <DataTitle>Specialty : </DataTitle>
                  <Data>{profile?.specialty}</Data>
                </DataItem>
              </Col>
            ) : (
              <Col sm={24} md={8} lg={6}>
                <DataItem>
                  <DataTitle>Purpose : </DataTitle>
                  <Data>{profile?.purpose}</Data>
                </DataItem>
              </Col>
            )}

            {profile?.userRole === userRoles.MEMBER && (
              <>
                <Col sm={24} md={8} lg={6}>
                  <DataItem>
                    <DataTitle>Weight : </DataTitle>
                    <Data>
                      {profile?.weight ? profile?.weight + "kg" : "--"}
                    </Data>
                  </DataItem>
                </Col>
                <Col sm={24} md={8} lg={6}>
                  <DataItem>
                    <DataTitle>Height : </DataTitle>
                    <Data>
                      {profile?.height ? profile?.height + "cm" : "--"}
                    </Data>
                  </DataItem>
                </Col>
              </>
            )}
          </Row>
          <LogoutWrapper>
            <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
          </LogoutWrapper>
        </ProfileContent>
      ) : (
        <FormContainer>
          <CustomForm>
            <Row gutter={24}>
              <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <FormItem>
                  <Label>Full Name</Label>
                  <InputFelid
                    name="fullName"
                    onChange={handleOnChange}
                    value={profile.fullName}
                  />
                  {errors?.fullName && (
                    <ErrorMessage>{errors?.fullName}</ErrorMessage>
                  )}
                </FormItem>
              </Col>
              <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <FormItem>
                  <Label>Birthday</Label>
                  <CustomDatePicker
                    name="dob"
                    onChange={handleOnChangeDatePicker}
                    value={profile.dob}
                  />
                  {errors?.dob && <ErrorMessage>{errors?.dob}</ErrorMessage>}
                </FormItem>
              </Col>
              <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <FormItem>
                  <Label>Gender</Label>
                  <CustomSelect
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "not to reveal", label: "Not to Reveal" },
                    ]}
                    onChange={(value) => {
                      setProfile({ ...profile, gender: value });
                    }}
                    value={profile.gender}
                  />
                  {errors?.gender && (
                    <ErrorMessage>{errors?.gender}</ErrorMessage>
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <FormItem>
                  <Label>Preferred Branch</Label>
                  <CustomSelect
                    options={[
                      { value: "hikkaduwa", label: "Hikkaduwa" },
                      { value: "unawatuna", label: "Unawatuna" },
                    ]}
                    onChange={(value) => {
                      setProfile({ ...profile, branch: value });
                    }}
                    value={profile.branch}
                  />
                  {errors?.branch && (
                    <ErrorMessage>{errors?.branch}</ErrorMessage>
                  )}
                </FormItem>
              </Col>
              <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <FormItem>
                  <Label>Mobile</Label>
                  <InputFelid
                    name="mobile"
                    onChange={handleOnChange}
                    value={profile.mobile}
                  />
                  {errors?.mobile && (
                    <ErrorMessage>{errors?.mobile}</ErrorMessage>
                  )}
                </FormItem>
              </Col>
              <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <FormItem>
                  <Label>Email</Label>
                  <InputFelid
                    name="email"
                    onChange={handleOnChange}
                    value={profile.email}
                  />
                  {errors?.email && (
                    <ErrorMessage>{errors?.email}</ErrorMessage>
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <FormItem>
                  <Label>NIC</Label>
                  <InputFelid
                    name="nic"
                    onChange={handleOnChange}
                    value={profile.nic}
                  />
                  {errors?.nic && <ErrorMessage>{errors?.nic}</ErrorMessage>}
                </FormItem>
              </Col>
              {profile?.userRole === userRoles.MEMBER && (
                <>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <FormItem>
                      <Label>Weight</Label>
                      <InputFelid
                        name="weight"
                        onChange={handleOnChange}
                        value={profile.weight}
                      />
                      {errors?.weight && (
                        <ErrorMessage>{errors?.weight}</ErrorMessage>
                      )}
                    </FormItem>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <FormItem>
                      <Label>Height</Label>
                      <InputFelid
                        name="height"
                        onChange={handleOnChange}
                        value={profile.height}
                      />
                      {errors?.height && (
                        <ErrorMessage>{errors?.height}</ErrorMessage>
                      )}
                    </FormItem>
                  </Col>
                </>
              )}

              {profile?.userRole === userRoles.INSTRUCTOR && (
                <>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <FormItem>
                      <Label>City</Label>
                      <InputFelid
                        name="city"
                        onChange={handleOnChange}
                        value={profile.city}
                      />
                      {errors?.city && (
                        <ErrorMessage>{errors?.city}</ErrorMessage>
                      )}
                    </FormItem>
                  </Col>
                  {profile?.userRole === userRoles.MEMBER && (
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                      <FormItem>
                        <Label>Preference</Label>
                        <CheckBoxes
                          value={profile.purpose}
                          options={preferenceOptions}
                          onChange={(value) =>
                            setProfile({ ...profile, purpose: value })
                          }
                        />
                        {errors?.purpose && (
                          <ErrorMessage>{errors?.purpose}</ErrorMessage>
                        )}
                      </FormItem>
                    </Col>
                  )}
                  {profile?.userRole === userRoles.INSTRUCTOR && (
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                      <FormItem>
                        <Label>Specialty</Label>
                        <CustomSelect
                          options={[
                            { label: "Weight Loss", value: "Weight Loss" },
                            {
                              label: "Muscle Building",
                              value: "Muscle Building",
                            },
                            {
                              label: "Athletic Performance",
                              value: "Athletic Performance",
                            },
                          ]}
                          onChange={(value) => {
                            setProfile({ ...profile, specialty: value });
                          }}
                          value={profile.specialty}
                        />
                      </FormItem>
                    </Col>
                  )}
                </>
              )}
            </Row>

            <Row gutter={24}>
              {profile?.userRole === userRoles.MEMBER && (
                <>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <FormItem>
                      <Label>City</Label>
                      <InputFelid
                        name="city"
                        onChange={handleOnChange}
                        value={profile.city}
                      />
                      {errors?.city && (
                        <ErrorMessage>{errors?.city}</ErrorMessage>
                      )}
                    </FormItem>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <FormItem>
                      <Label>Preference</Label>
                      <CheckBoxes
                        value={profile.purpose}
                        options={preferenceOptions}
                        onChange={(value) =>
                          setProfile({ ...profile, purpose: value })
                        }
                      />
                      {errors?.purpose && (
                        <ErrorMessage>{errors?.purpose}</ErrorMessage>
                      )}
                    </FormItem>
                  </Col>
                </>
              )}
            </Row>

            <FormItem style={{ alignItems: "center" }}>
              <RegisterButton
                type="primary"
                htmlType="submit"
                onClick={handleUpdate}
              >
                UPDATE
              </RegisterButton>
            </FormItem>
          </CustomForm>
        </FormContainer>
      )}
    </Container>
  );
};

export default Profile;
