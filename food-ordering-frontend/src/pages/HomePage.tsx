import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useCitySearch } from "@/api/CityApi";
import GlobalSpinner from "@/components/GlobalSpinner";

const HomePage = () => {
  const navigate = useNavigate();
  const { loading: citiesLoading } = useCitySearch();

  const handleSearchSubmit = (formValues: SearchForm) => {
    const cityParam =
      formValues.city && formValues.city.trim() !== ""
        ? formValues.city
        : "all";
    navigate({
      pathname: `/search/${cityParam}`,
      search: formValues.searchQuery
        ? `?searchQuery=${encodeURIComponent(formValues.searchQuery)}`
        : undefined,
    });
  };

  return (
    <>
      {citiesLoading && <GlobalSpinner />}
      <div className="flex flex-col gap-12">
        <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
          {/* Updated Title & Tagline */}
          <h1 className="text-5xl font-bold tracking-tight text-orange-600">
            Deliciousness delivered instantly!
          </h1>
          <span className="text-xl">Order your favorites in seconds!</span>

          <div className="flex flex-row gap-3 items-center justify-center">
            <div className="w-full">
              <SearchBar
                placeHolder="Search by Cuisine or Restaurant Name"
                onSubmit={handleSearchSubmit}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <img src={landingImage} />
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <span className="font-bold text-3xl tracking-tighter">
              Order takeaway even faster!
            </span>
            {/* Updated App Download Text */}
            <span>
              Download the FoodiesHub App for faster ordering and personalised
              recommendations
            </span>
            <img src={appDownloadImage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
