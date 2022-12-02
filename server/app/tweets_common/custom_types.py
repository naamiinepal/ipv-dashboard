from enum import IntEnum
from typing import List, Optional, Tuple

from pydantic import NonNegativeInt, PositiveInt, conint

# Sexual score is in the range of 1 to 10
sexual_score_kwargs = {"ge": 1, "le": 10}

# Becomes null if the tweet is not sexual
sexual_score_int = Optional[conint(**sexual_score_kwargs)]


class AspectEnum(IntEnum):
    others = 0
    profanity = 1
    physical_threat = 2
    rape_threat = 3
    general_threat = 4
    ethnic_violence = 5
    religion_violence = 6
    sexism = 7
    character_assasination = 8


AspectAnnoType = List[Tuple[NonNegativeInt, PositiveInt, AspectEnum]]

# Max video and comments results
MaxResultsType = conint(ge=1, le=100)
