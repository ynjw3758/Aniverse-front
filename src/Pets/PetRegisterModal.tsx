import "./PetRegisterModal.scss";
import beforeImg from "../assets/images/begorearrow.png";
import MaleImg from "../assets/images/male.png";
import FemaleImg from "../assets/images/female.png";
import { useEffect, useMemo, useRef, useState } from "react";
import SpeciesPicker from "./components/SpeciesPicker";
import BreedPicker from "./components/BreedPicker";

interface props{
    FormData: (data :PetRegisterPayload) => void 
}


type PetRegisterPayload = {
    name: string
    profileImage: string
    species: SpeciesInfo
    breed: BreedInfo
    gender: GenderType
    birthDate: string
    ageLabel: string
    traits: string[]
}
type SpeciesInfo = {
  title: string;
  code: string;
  id: number;
};

type BreedInfo = {
  breedId: number | null;
  nameKo: string;
  nameEn: string;
  code: string;
};

type GenderType = "male" | "female"

const PetRegisterModal:React.FC<props> = ({FormData}:props) => {
  const [isProfile, setIsProfile] = useState(false);
  const [step, setStep] = useState<"form" | "species" | "breed">("form");
  const [imageFile, setImageFile] = useState("");
  const [petName, setPetName] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesInfo | null>(null);
  const [selectedBreed, setSelectedBreed] = useState<BreedInfo>({
    breedId: null,
    nameKo: "",
    nameEn: "",
    code: "",
  });
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [birthDate, setBirthDate] = useState("");
  const [adoptionDate, setAdoptionDate] = useState("");
  const [ageLabel, setAgeLabel] = useState("");
  const [traitInput, setTraitInput] = useState("");
  const [traitItems, setTraitItems] = useState<string[]>([]);

  const birthInputRef = useRef<HTMLInputElement | null>(null);
  const adoptionInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (imageFile) URL.revokeObjectURL(imageFile);
    };
  }, [imageFile]);

  const isFormValid = useMemo(() => {
    return Boolean(petName.trim() && selectedSpecies && selectedBreed.breedId && gender);
  }, [gender, petName, selectedBreed.breedId, selectedSpecies]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageFile(imageUrl);
    setIsProfile(true);
  };

  const formatDate = (value: string) => {
    if (!value) return "";
    const [year, month, day] = value.split("-");
    return `${year}.${month}.${day}`;
  };

  const openDatePicker = (target: "birth" | "adoption") => {
    const input = target === "birth" ? birthInputRef.current : adoptionInputRef.current;
    if (!input) return;

    if (typeof input.showPicker === "function") {
      input.showPicker();
    } else {
      input.click();
      input.focus();
    }
  };

  const openSpeciesModal = () => {
    setStep("species");
  };

  const openBreedModal = () => {
    if (!selectedSpecies) {
      setStep("species");
      return;
    }
    setStep("breed");
  };

  const handleSpeciesNext = (info: SpeciesInfo) => {
    setSelectedSpecies(info);
    setSelectedBreed({
      breedId: null,
      nameKo: "",
      nameEn: "",
      code: "",
    });
    setStep("breed");
  };

  const handleBreedSelected = (item: BreedInfo) => {
    setSelectedBreed(item);
    setStep("form");
  };

  const addTrait = () => {
    const normalized = traitInput.trim();
    if (!normalized) return;

    setTraitItems((prev) => {
      if (prev.includes(normalized)) return prev;
      return [...prev, normalized];
    });

    setTraitInput("");
  };

  const removeTrait = (option: string) => {
    setTraitItems((prev) => prev.filter((value) => value !== option));
  };

  const handleTraitKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    addTrait();
  };

  const cancelHandler = () => {};

  const registerHandler = () => {

    const formData:PetRegisterPayload={
            name: petName ,profileImage: imageFile, species: selectedSpecies!, 
            breed: selectedBreed, gender: gender!, birthDate: birthDate,
            ageLabel: ageLabel, traits: traitItems
    }
    FormData(formData);

  };

  return (
    <div className="PetRegisterModal_Main">
      {step === "form" && (
        <>
          <div className="PetRegisterModal_Header">
            <button type="button" className="PetRegisterModal_BackButton">
              <img src={beforeImg} alt="뒤로가기" />
            </button>
            <h3 className="PetRegisterModal_Title">새 반려동물 등록</h3>
          </div>

          <div className="PetRegisterModal_Contents">
            <div className="PetRegisterModal_Body">
              <p className="PetRegisterModal_Helper">
                게시물에 연결할 반려동물 프로필을 만들어보세요
              </p>

              <div className="PetRegister_InputForm">
                <section className="PetRegister_Section">
                  <div className="PetRegister_ProfileHeader">
                    <label className="PetRegister_ProfileCircle compact">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                      {isProfile ? (
                        <>
                          <img src={imageFile} className="PetRegister_ProfileImg" alt="반려동물 프로필" />
                          <span className="PetRegister_ProfileEdit">수정</span>
                        </>
                      ) : (
                        <>
                          <span className="PetRegister_PlusIcon">+</span>
                          <span className="PetRegister_ProfileHint">사진 추가</span>
                        </>
                      )}
                    </label>

                    <div className="PetRegister_ProfileMeta">
                      <h4>{petName.trim() || "이름 미입력"}</h4>
                      <p>
                        {selectedSpecies?.title || "동물 종류"}
                        {" · "}
                        {gender === "male" ? "수컷" : gender === "female" ? "암컷" : "성별 선택"}
                      </p>
                      <span>{isProfile ? "방금 등록할 프로필" : "대표 사진을 먼저 등록해보세요"}</span>
                    </div>
                  </div>

                    <div className="PetRegister_SectionHeader">
                    <h4>
                        <span className="PetRegister_TitleHighlight">필수 정보</span>
                        <span className="PetRegister_TitleDesc">
                        (게시물에 표시될 기본 정보예요)
                        </span>
                    </h4>
                    </div>

                  <div className="PetRegister_Field">
                    <label htmlFor="pet-name">이름</label>
                    <input
                      id="pet-name"
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      placeholder="이름을 입력해주세요"
                    />
                  </div>

                  <div className="PetRegister_FieldRow">
                    <div className="PetRegister_Field">
                      <label>동물 종류</label>
                      <button
                        type="button"
                        className={`PetRegister_Select ${selectedSpecies ? "filled" : ""}`}
                        onClick={openSpeciesModal}
                      >
                        <span>{selectedSpecies ? selectedSpecies.title : "어떤 동물인가요?"}</span>
                        <span className="PetRegister_SelectArrow">›</span>
                      </button>
                    </div>

                    <div className="PetRegister_Field">
                      <label>품종</label>
                      <button
                        type="button"
                        className={`PetRegister_Select ${selectedBreed.breedId ? "filled" : ""}`}
                        onClick={openBreedModal}
                        disabled={!selectedSpecies}
                      >
                        <span>
                          {selectedBreed.breedId
                            ? selectedBreed.nameKo
                            : selectedSpecies
                              ? "품종을 선택해주세요"
                              : "동물 종류를 먼저 선택해주세요"}
                        </span>
                        <span className="PetRegister_SelectArrow">›</span>
                      </button>
                    </div>
                  </div>

                  <div className="PetRegister_Field">
                    <label>성별</label>
                    <div className="PetRegister_SelectSex">
                      <button
                        type="button"
                        className={`PetRegister_GenderCard male ${gender === "male" ? "active" : ""}`}
                        onClick={() => setGender("male")}
                      >
                        <img src={MaleImg} alt="" />
                        <span>수컷</span>
                      </button>
                      <button
                        type="button"
                        className={`PetRegister_GenderCard female ${gender === "female" ? "active" : ""}`}
                        onClick={() => setGender("female")}
                      >
                        <img src={FemaleImg} alt="" />
                        <span>암컷</span>
                      </button>
                    </div>
                  </div>
                </section>

                <section className="PetRegister_Section optional">
                  <div className="PetRegister_SectionHeader">
                    <h4>선택 정보</h4>
                    <span>지금 안 적어도 나중에 추가할 수 있어요</span>
                  </div>

                  <div className="PetRegister_Field">
                    <label htmlFor="pet-age">생일 또는 나이</label>
                    <input
                      id="pet-age"
                      value={ageLabel}
                      onChange={(e) => setAgeLabel(e.target.value)}
                      placeholder="예: 2살, 2024.03.12"
                    />
                  </div>

                  <div className="PetRegister_FieldRow">
                    <div className="PetRegister_Field">
                      <label>생일</label>
                      <div className="PetRegister_DateBox" onClick={() => openDatePicker("birth")}>
                        <span className={`PetRegister_DateText ${birthDate ? "filled" : ""}`}>
                          {birthDate ? formatDate(birthDate) : "날짜를 선택해주세요"}
                        </span>
                        <span className="PetRegister_DateIcon">📅</span>
                        <input
                          ref={birthInputRef}
                          type="date"
                          value={birthDate}
                          max={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setBirthDate(e.target.value)}
                          className="PetRegister_DateInput"
                        />
                      </div>
                    </div>

                    <div className="PetRegister_Field">
                      <label>입양일</label>
                      <div className="PetRegister_DateBox" onClick={() => openDatePicker("adoption")}>
                        <span className={`PetRegister_DateText ${adoptionDate ? "filled" : ""}`}>
                          {adoptionDate ? formatDate(adoptionDate) : "날짜를 선택해주세요"}
                        </span>
                        <span className="PetRegister_DateIcon">📅</span>
                        <input
                          ref={adoptionInputRef}
                          type="date"
                          value={adoptionDate}
                          max={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setAdoptionDate(e.target.value)}
                          className="PetRegister_DateInput"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="PetRegister_Field">
                    <label htmlFor="pet-traits">이 아이를 어떻게 소개하면 좋을까요?</label>
                    <p className="PetRegister_FieldHint">
                      성격이나 습관을 하나씩 추가해보세요. 엔터를 누르거나 추가 버튼을 눌러 등록할 수 있어요.
                    </p>
                    <div className="PetRegister_TraitComposer">
                      <input
                        id="pet-traits"
                        value={traitInput}
                        onChange={(e) => setTraitInput(e.target.value)}
                        onKeyDown={handleTraitKeyDown}
                        placeholder="예: 낯가림 있어요"
                      />
                      <button
                        type="button"
                        className="PetRegister_TraitAddBtn"
                        onClick={addTrait}
                        disabled={!traitInput.trim()}
                      >
                        추가
                      </button>
                    </div>

                    <p className="PetRegister_TraitLabel">추가된 특징</p>
                    <div className="PetRegister_TraitChips">
                      {traitItems.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className="PetRegister_TraitChip active"
                          onClick={() => removeTrait(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="PetRegister_Action">
              <button type="button" className="PetRegister_CancelBtn" onClick={cancelHandler}>
                취소
              </button>

              <button
                type="submit"
                className="PetRegister_SubmitBtn"
                onClick={registerHandler}
                disabled={!isFormValid}
              >
                등록
              </button>
            </div>
          </div>
        </>
      )}

      {step === "species" && <SpeciesPicker next={handleSpeciesNext} />}
      {step === "breed" && selectedSpecies && (
        <BreedPicker spInfo={selectedSpecies} onSeleted={handleBreedSelected} />
      )}
    </div>
  );
};

export default PetRegisterModal;
